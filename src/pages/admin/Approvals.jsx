"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  User,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  getApprovals,
  approveApproval,
  rejectApproval,
  deleteApproval,
} from "@/services/approvalService";

export default function Approvals() {
  // State management
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Fetch approvals on mount and when filters change
  useEffect(() => {
    fetchApprovals();
  }, [currentPage, itemsPerPage, statusFilter]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1); // Reset to first page on search
      } else {
        fetchApprovals();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const response = await getApprovals(params);

      setApprovals(response.data.approvals || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching approvals:", error);
      toast.error("Failed to fetch approvals");
      setApprovals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (approvalId) => {
    try {
      await approveApproval(approvalId);
      toast.success("Request approved successfully");
      fetchApprovals();
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request");
    }
  };

  const handleRejectRequest = async () => {
    try {
      await rejectApproval(selectedApproval._id, rejectionReason);
      toast.success("Request rejected successfully");
      setRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedApproval(null);
      fetchApprovals();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Since filtering is handled by the API, we use approvals directly
  const filteredApprovals = approvals;

  const openViewDialog = (approval) => {
    setSelectedApproval(approval);
    setViewDialogOpen(true);
  };

  const openRejectDialog = (approval) => {
    setSelectedApproval(approval);
    setRejectDialogOpen(true);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Approval Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and manage member approval requests
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by user, address, or assignment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="statusFilter"
                className="text-sm text-muted-foreground"
              >
                Status:
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label
                htmlFor="itemsPerPage"
                className="text-sm text-muted-foreground"
              >
                Show:
              </Label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) =>
                  setItemsPerPage(Number.parseInt(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Approval Requests
          </CardTitle>
          <CardDescription>
            {filteredApprovals.length} requests found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredApprovals.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No approval requests found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Last Assignment</TableHead>
                    <TableHead>Pension Branch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals.map((approval) => (
                    <TableRow key={approval._id}>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {approval.requestedBy?.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {approval.requestedBy?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {approval.address || "Not provided"}
                      </TableCell>
                      <TableCell>
                        {approval.lastAssignment || "Not specified"}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {approval.pensionBranch}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {approval.pensionBranchCircle}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(approval.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(approval.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(approval)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {approval.status === "pending" && (
                            <>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Approve Request
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to approve the
                                      request for "{approval.requestedBy.name}"?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleApproveRequest(approval._id)
                                      }
                                      className="bg-green-600 text-white hover:bg-green-700"
                                    >
                                      Approve
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => openRejectDialog(approval)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Approval Request Details
            </DialogTitle>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-6">
              {/* Status and Request Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedApproval.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Requested By</Label>
                  <div className="mt-1">
                    <p className="flex items-center gap-2 font-medium">
                      <User className="h-4 w-4" />
                      {selectedApproval.requestedBy?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedApproval.requestedBy?.email}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Request Date</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedApproval.createdAt)}
                  </p>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Request Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="mt-1 bg-muted p-3 rounded-md">
                      {selectedApproval.address || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Last Assignment
                    </Label>
                    <p className="mt-1 font-medium">
                      {selectedApproval.lastAssignment || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Pension Branch
                    </Label>
                    <p className="mt-1">
                      {selectedApproval.pensionBranch || "Not provided"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">
                      Pension Branch Circle
                    </Label>
                    <p className="mt-1">
                      {selectedApproval.pensionBranchCircle || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Approval Information */}
              {(selectedApproval.status === "approved" ||
                selectedApproval.status === "rejected") && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Approval Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">
                        {selectedApproval.status === "approved"
                          ? "Approved By"
                          : "Rejected By"}
                      </Label>
                      <div className="mt-1">
                        <p className="flex items-center gap-2 font-medium">
                          <User className="h-4 w-4" />
                          {selectedApproval.approvedBy?.name || "System Admin"}
                        </p>
                        {selectedApproval.approvedBy?.email && (
                          <p className="text-sm text-muted-foreground">
                            {selectedApproval.approvedBy.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Action Date
                      </Label>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedApproval.updatedAt)}
                      </p>
                    </div>
                    {selectedApproval.status === "rejected" &&
                      selectedApproval.rejectionReason && (
                        <div className="md:col-span-2">
                          <Label className="text-muted-foreground">
                            Rejection Reason
                          </Label>
                          <p className="mt-1 p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
                            {selectedApproval.rejectionReason}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter the reason for rejection..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectionReason("");
                setSelectedApproval(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleRejectRequest}
              disabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
