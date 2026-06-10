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
  DialogHeader,
  DialogTitle,
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
import {
  Search,
  Activity,
  Calendar,
  User,
  FileText,
  Shield,
  Eye,
  Plus,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  UserCheck,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { getLogs } from "../../services/logService";

export default function ActivityLogs() {
  // State management
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    fetchActivityLogs();
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchActivityLogs = async () => {
    setLoading(true);
    try {
      const response = await getLogs({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });

      if (response.status === 200) {
        setLogs(response.data.logs);
        setTotalPages(response.data?.pagination?.totalPages);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch activity logs"
      );
    } finally {
      setLoading(false);
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

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setViewDialogOpen(true);
  };

  const getActionIcon = (action) => {
    const iconMap = {
      create: Plus,
      update: Edit,
      delete: Trash2,
      view: Eye,
      login: LogIn,
      logout: LogOut,
      assign_role: UserCheck,
      approve: CheckCircle,
      reject: XCircle,
      other: MoreHorizontal,
    };
    const IconComponent = iconMap[action] || MoreHorizontal;
    return <IconComponent className="h-4 w-4" />;
  };

  const getActionBadgeVariant = (action) => {
    const variantMap = {
      create: "default",
      update: "secondary",
      delete: "destructive",
      view: "outline",
      login: "default",
      logout: "secondary",
      assign_role: "default",
      approve: "default",
      reject: "destructive",
      other: "outline",
    };
    return variantMap[action] || "outline";
  };

  const getResourceIcon = (resource) => {
    const iconMap = {
      Document: FileText,
      Member: User,
      Role: Shield,
      Image: FileText,
      System: Activity,
    };
    const IconComponent = iconMap[resource] || Activity;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Activity Logs
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor system activities and user actions
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search logs by user, action, resource or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="itemsPerPage"
              className="text-sm text-muted-foreground"
            >
              Show:
            </label>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}
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

      {/* Activity Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Activity
          </CardTitle>
          <CardDescription>{logs.length} activity logs found</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No activity logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {log.user?.name || "Unknown User"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {log.user?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getActionBadgeVariant(log.action)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getActionIcon(log.action)}
                          {log.action.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getResourceIcon(log.resource)}
                          <span className="font-medium">{log.resource}</span>
                          {log.resourceId && (
                            <Badge variant="outline" className="text-xs">
                              {log.resourceId.slice(-6)}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        <p className="text-sm">{log.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(log.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewLog(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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

      {/* View Log Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Log Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about this system activity
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-muted-foreground">
                    User
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {selectedLog.user?.name || "Unknown User"}
                      </p>
                      <p className="text-muted-foreground">
                        {selectedLog.user?.email || "No email"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">
                    Action
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={getActionBadgeVariant(selectedLog.action)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getActionIcon(selectedLog.action)}
                      {selectedLog.action.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">
                    Resource
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    {getResourceIcon(selectedLog.resource)}
                    <span className="font-medium">{selectedLog.resource}</span>
                    {selectedLog.resourceId && (
                      <Badge variant="outline" className="text-xs">
                        {selectedLog.resourceId}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">
                    Timestamp
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedLog.createdAt)}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-muted-foreground">
                    Description
                  </label>
                  <p className="mt-1 text-sm bg-muted p-3 rounded-md">
                    {selectedLog.description}
                  </p>
                </div>
                {selectedLog.ipAddress && (
                  <div>
                    <label className="font-medium text-muted-foreground">
                      IP Address
                    </label>
                    <p className="mt-1 font-mono text-sm">
                      {selectedLog.ipAddress}
                    </p>
                  </div>
                )}
                {selectedLog.userAgent && (
                  <div className="md:col-span-2">
                    <label className="font-medium text-muted-foreground">
                      User Agent
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground bg-muted p-2 rounded-md break-all">
                      {selectedLog.userAgent}
                    </p>
                  </div>
                )}
                {selectedLog.metadata &&
                  Object.keys(selectedLog.metadata).length > 0 && (
                    <div className="md:col-span-2">
                      <label className="font-medium text-muted-foreground">
                        Additional Data
                      </label>
                      <div className="mt-1 bg-muted p-3 rounded-md">
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {JSON.stringify(selectedLog.metadata, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
