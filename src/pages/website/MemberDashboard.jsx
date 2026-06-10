import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { validateMember, logout, changePassword } from "@/services/authService";
import {
  FileText,
  User,
  Edit,
  Key,
  LogOut,
  Eye,
  Calendar,
  MapPin,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Loader from "../../components/Loader";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { getDocuments, viewDocument } from "../../services/documentService";
import { getMyApprovals, createApproval } from "../../services/approvalService";
export default function MemberDashboard() {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentsPagination, setDocumentsPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [memberDetails, setMemberDetails] = useState({});
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [approvalsPagination, setApprovalsPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [documentViewer, setDocumentViewer] = useState({
    isOpen: false,
    documentUrl: null,
    documentName: "",
    contentType: "",
    loading: false,
  });
  const [approvalForm, setApprovalForm] = useState({
    address: "",
    lastAssignment: "",
    pensionBranch: "",
    pensionBranchCircle: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validate member token on component mount
  useEffect(() => {
    validateMemberToken();
  }, []);

  // Fetch data only after successful validation
  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
      fetchApprovalRequests();
    }
  }, [isAuthenticated]);

  const validateMemberToken = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        redirectToLogin();
        return;
      }

      const response = await validateMember();

      if (response.data.valid) {
        setIsAuthenticated(true);
        setMemberDetails(response.data.user);
        setApprovalForm({
          address: response.data.user.address || "",
          lastAssignment: response.data.user.lastAssignment || "",
          pensionBranch: response.data.user.pensionBranch || "",
          pensionBranchCircle: response.data.user.pensionBranchCircle || "",
        });
      } else {
        redirectToLogin();
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      redirectToLogin();
    } finally {
      setIsValidating(false);
    }
  };

  const redirectToLogin = () => {
    Cookies.remove("accessToken");
    toast.error("Session expired. Please login again.");
    navigate("/login");
  };

  const fetchDocuments = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await getDocuments({ page, limit });
      if (response.status === 200) {
        setDocuments(response.data.documents);
        setDocumentsPagination(response.data.pagination);
      } else {
        throw response;
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentsPageChange = (newPage) => {
    fetchDocuments(newPage, documentsPagination.limit);
  };

  const handleDocumentsLimitChange = (newLimit) => {
    fetchDocuments(1, newLimit);
  };

  const handleApprovalsPageChange = (newPage) => {
    fetchApprovalRequests(newPage, approvalsPagination.limit);
  };

  const handleApprovalsLimitChange = (newLimit) => {
    fetchApprovalRequests(1, newLimit);
  };

  const fetchApprovalRequests = async (page = 1, limit = 10) => {
    try {
      const response = await getMyApprovals({ page, limit });
      if (response.status === 200) {
        setApprovalRequests(response.data.approvals);
        setApprovalsPagination(response.data.pagination);
      } else {
        throw response;
      }
    } catch (error) {
      console.error("Error fetching approval requests:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch approval requests"
      );
    }
  };

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();

    // Check if any data has actually changed
    const hasChanges =
      approvalForm.address.trim() !== (memberDetails.address || "").trim() ||
      approvalForm.lastAssignment.trim() !==
        (memberDetails.lastAssignment || "").trim() ||
      approvalForm.pensionBranch.trim() !==
        (memberDetails.pensionBranch || "").trim() ||
      approvalForm.pensionBranchCircle.trim() !==
        (memberDetails.pensionBranchCircle || "").trim();

    if (!hasChanges) {
      toast.error(
        "Please make changes to your profile information before submitting"
      );
      return;
    }

    // Validate form data
    if (!approvalForm.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!approvalForm.lastAssignment.trim()) {
      toast.error("Last Assignment is required");
      return;
    }
    if (!approvalForm.pensionBranch.trim()) {
      toast.error("Pension Branch is required");
      return;
    }
    if (!approvalForm.pensionBranchCircle.trim()) {
      toast.error("Pension Branch Circle is required");
      return;
    }

    setLoading(true);
    try {
      const response = await createApproval({
        address: approvalForm.address.trim(),
        lastAssignment: approvalForm.lastAssignment.trim(),
        pensionBranch: approvalForm.pensionBranch.trim(),
        pensionBranchCircle: approvalForm.pensionBranchCircle.trim(),
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Approval request submitted successfully");
        setIsApprovalDialogOpen(false);

        // Reset form to original member details
        setApprovalForm({
          address: memberDetails.address || "",
          lastAssignment: memberDetails.lastAssignment || "",
          pensionBranch: memberDetails.pensionBranch || "",
          pensionBranchCircle: memberDetails.pensionBranchCircle || "",
        });

        // Refresh approval requests to show the new one
        fetchApprovalRequests();
      } else {
        throw response;
      }
    } catch (error) {
      console.error("Error submitting approval request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit approval request";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = async (documentId, fileName) => {
    try {
      setDocumentViewer((prev) => ({ ...prev, loading: true, isOpen: true }));

      const response = await viewDocument(documentId);

      // Get content type from response headers
      const contentType =
        response.headers["content-type"] || "application/octet-stream";

      // Check if file type is viewable
      const viewableTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "text/plain",
        "text/html",
      ];

      if (!viewableTypes.includes(contentType.toLowerCase())) {
        toast.error(
          `Cannot preview ${contentType} files. File type not supported for viewing.`
        );
        setDocumentViewer({
          isOpen: false,
          documentUrl: null,
          documentName: "",
          contentType: "",
          loading: false,
        });
        return;
      }

      // Create blob URL for viewing
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      setDocumentViewer({
        isOpen: true,
        documentUrl: url,
        documentName: fileName || "Document",
        contentType: contentType,
        loading: false,
      });
    } catch (error) {
      console.error("Error viewing document:", error);
      setDocumentViewer({
        isOpen: false,
        documentUrl: null,
        documentName: "",
        contentType: "",
        loading: false,
      });

      if (error.response?.status === 404) {
        toast.error("Document not found");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to view this document");
      } else {
        toast.error("Failed to load document. Please try again.");
      }
    }
  };

  const closeDocumentViewer = () => {
    if (documentViewer.documentUrl) {
      window.URL.revokeObjectURL(documentViewer.documentUrl);
    }
    setDocumentViewer({
      isOpen: false,
      documentUrl: null,
      documentName: "",
      contentType: "",
      loading: false,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await changePassword({
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully");
        setIsPasswordDialogOpen(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw response;
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();

      // Clear all stored data
      Cookies.remove("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API fails, clear local storage and redirect
      Cookies.remove("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");

      const errorMessage =
        error.response?.data?.message || "Logout completed (with errors)";
      toast.success("Logged out successfully");
      navigate("/login");
    } finally {
      setLogoutLoading(false);
    }
  };

  // Helper function to check if user has pending approval requests
  const hasPendingApprovalRequests = () => {
    return approvalRequests.some((request) => request.status === "pending");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
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
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      approved: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      rejected: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Show loader while validating token
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Don't render anything if not authenticated (redirecting)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Member Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {memberDetails.name}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              disabled={logoutLoading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {logoutLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 space-y-8">
        {/* Member Details Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-5">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your current profile information
              </CardDescription>
            </div>
            {!hasPendingApprovalRequests() && (
              <Dialog
                open={isApprovalDialogOpen}
                onOpenChange={setIsApprovalDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Request Changes
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Profile Changes</DialogTitle>
                    <DialogDescription>
                      Submit a request to update your profile information.
                      Changes require admin approval.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleApprovalSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={approvalForm.address}
                        onChange={(e) =>
                          setApprovalForm((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter your new address"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastAssignment">Last Assignment</Label>
                      <Input
                        id="lastAssignment"
                        value={approvalForm.lastAssignment}
                        onChange={(e) =>
                          setApprovalForm((prev) => ({
                            ...prev,
                            lastAssignment: e.target.value,
                          }))
                        }
                        placeholder="Enter your last assignment"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pensionBranch">Pension Branch</Label>
                      <Input
                        id="pensionBranch"
                        value={approvalForm.pensionBranch}
                        onChange={(e) =>
                          setApprovalForm((prev) => ({
                            ...prev,
                            pensionBranch: e.target.value,
                          }))
                        }
                        placeholder="Enter pension branch"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pensionBranchCircle">
                        Pension Branch Circle
                      </Label>
                      <Input
                        id="pensionBranchCircle"
                        value={approvalForm.pensionBranchCircle}
                        onChange={(e) =>
                          setApprovalForm((prev) => ({
                            ...prev,
                            pensionBranchCircle: e.target.value,
                          }))
                        }
                        placeholder="Enter pension branch circle"
                        required
                        disabled={loading}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsApprovalDialogOpen(false)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Request"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="w-4 h-4" />
                  Basic Information
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {memberDetails.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {memberDetails.email}
                  </p>
                  <p>
                    <span className="font-medium">PF Number:</span>{" "}
                    {memberDetails.pf}
                  </p>
                  <p>
                    <span className="font-medium">URN:</span>{" "}
                    {memberDetails.urn}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Dates & Personal
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {format(memberDetails.dob, "MMMM dd, yyyy")}
                  </p>
                  <p>
                    <span className="font-medium">Date of Retirement:</span>{" "}
                    {format(memberDetails.dor, "MMMM dd, yyyy")}
                  </p>
                  <p>
                    <span className="font-medium">Blood Group:</span>{" "}
                    {memberDetails.bloodGroup}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {memberDetails.gender}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Contact & Work
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {memberDetails.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {memberDetails.address}
                  </p>
                  <p>
                    <span className="font-medium">Last Assignment:</span>{" "}
                    {memberDetails.lastAssignment}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Building className="w-4 h-4" />
                  Pension Details
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Pension Branch:</span>{" "}
                    {memberDetails.pensionBranch}
                  </p>
                  <p>
                    <span className="font-medium">Branch Circle:</span>{" "}
                    {memberDetails.pensionBranchCircle}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span>{" "}
                    {memberDetails.role?.name}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Requests Section - Only show if there are approval requests */}
        {approvalRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Pending Approval Requests
              </CardTitle>
              <CardDescription>
                Your submitted requests awaiting admin approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Profile Update Request</h4>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Address:</span>{" "}
                        {request.address}
                      </div>
                      <div>
                        <span className="font-medium">Last Assignment:</span>{" "}
                        {request.lastAssignment}
                      </div>
                      <div>
                        <span className="font-medium">Pension Branch:</span>{" "}
                        {request.pensionBranch}
                      </div>
                      <div>
                        <span className="font-medium">Branch Circle:</span>{" "}
                        {request.pensionBranchCircle}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Submitted on {formatDate(request.createdAt)}
                    </div>
                    {request.status === "rejected" && (
                      <div className="flex gap-2">
                        Reason for rejection: {request.rejectionReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Approvals Pagination */}
              {approvalsPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Items per page:
                    </Label>
                    <Select
                      value={approvalsPagination.limit.toString()}
                      onValueChange={(value) =>
                        handleApprovalsLimitChange(Number(value))
                      }
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Page {approvalsPagination.page} of{" "}
                      {approvalsPagination.totalPages} (
                      {approvalsPagination.total} total requests)
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleApprovalsPageChange(
                            approvalsPagination.page - 1
                          )
                        }
                        disabled={approvalsPagination.page === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleApprovalsPageChange(
                            approvalsPagination.page + 1
                          )
                        }
                        disabled={
                          approvalsPagination.page ===
                          approvalsPagination.totalPages
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents
            </CardTitle>
            <CardDescription>
              Documents uploaded by administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>

                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No documents available
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow key={doc._id}>
                        <TableCell className="font-medium">
                          {doc.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {doc.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleViewDocument(doc._id, doc.title)
                              }
                              disabled={loading}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Documents Pagination */}
            {documentsPagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Items per page:</Label>
                  <Select
                    value={documentsPagination.limit.toString()}
                    onValueChange={(value) =>
                      handleDocumentsLimitChange(Number(value))
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {documentsPagination.page} of{" "}
                    {documentsPagination.totalPages}({documentsPagination.total}{" "}
                    total documents)
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDocumentsPageChange(documentsPagination.page - 1)
                      }
                      disabled={documentsPagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDocumentsPageChange(documentsPagination.page + 1)
                      }
                      disabled={
                        documentsPagination.page ===
                        documentsPagination.totalPages
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="flex-row justify-between gap-5 flex-wrap">
          <CardHeader className="flex-col w-full">
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and choose a new one.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      required
                      disabled={passwordLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      minLength={4}
                      required
                      disabled={passwordLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      minLength={4}
                      required
                      disabled={passwordLoading}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPasswordDialogOpen(false)}
                      disabled={passwordLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={passwordLoading}>
                      {passwordLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Custom Document Viewer Modal */}
      <Dialog open={documentViewer.isOpen} onOpenChange={closeDocumentViewer}>
        <DialogContent
          className="max-w-none w-screen h-screen p-0 m-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-muted/30 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-semibold truncate">
                  {documentViewer.documentName}
                </h2>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 overflow-hidden bg-muted/10 relative w-full">
              {documentViewer.loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader />
                </div>
              ) : documentViewer.documentUrl ? (
                <div className="h-full w-full relative">
                  {documentViewer.contentType === "application/pdf" ? (
                    <div className="h-full w-full relative">
                      <iframe
                        src={`${documentViewer.documentUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
                        className="w-full h-full border-0"
                        title={documentViewer.documentName}
                        style={{
                          userSelect: "none",
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  ) : documentViewer.contentType.startsWith("image/") ? (
                    <div className="flex items-center justify-center h-full p-4">
                      <img
                        src={documentViewer.documentUrl}
                        alt={documentViewer.documentName}
                        className="max-w-full max-h-full object-contain select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                    </div>
                  ) : documentViewer.contentType.startsWith("text/") ? (
                    <div className="h-full overflow-auto">
                      <iframe
                        src={documentViewer.documentUrl}
                        className="w-full h-full border-0"
                        title={documentViewer.documentName}
                        style={{
                          fontFamily: "monospace",
                          padding: "20px",
                          whiteSpace: "pre-wrap",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Preview not available for this file type</p>
                        <p className="text-sm">{documentViewer.contentType}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="p-2 border-t bg-muted/30 flex justify-end items-center shrink-0">
              {/* <div className="text-sm text-muted-foreground">
                Document viewing only - Download not available
              </div> */}
              <Button
                variant="outline"
                size="sm"
                className=""
                onClick={closeDocumentViewer}
              >
                Close Viewer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
