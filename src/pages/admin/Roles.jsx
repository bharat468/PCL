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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Shield,
  Calendar,
  Users,
} from "lucide-react";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../services/roleService";
import Loader from "../../components/Loader";
import { toast } from "sonner";
import PermissionGuard from "../../components/PermissionGuard";

// Available permissions from the schema
const PERMISSIONS = [
  "view_documents",
  "edit_documents",
  "delete_documents",
  "create_documents",
  "create_images",
  "view_images",
  "edit_images",
  "delete_images",
  "create_members",
  "view_members",
  "edit_members",
  "delete_members",
  "create_admins",
  "view_admins",
  "edit_admins",
  "delete_admins",
  "create_roles",
  "view_roles",
  "edit_roles",
  "delete_roles",
  "assign_roles",
  "view_pending_approvals",
  "edit_pending_approvals",
  "view_messages",
  "delete_messages",
];

// Group permissions by category for better UX
const PERMISSION_GROUPS = {
  Documents: [
    "view_documents",
    "edit_documents",
    "delete_documents",
    "create_documents",
  ],
  Images: ["create_images", "view_images", "edit_images", "delete_images"],
  Members: ["create_members", "view_members", "edit_members", "delete_members"],
  Admins: ["create_admins", "view_admins", "edit_admins", "delete_admins"],
  Roles: [
    "create_roles",
    "view_roles",
    "edit_roles",
    "delete_roles",
    "assign_roles",
  ],
  Approvals: ["view_pending_approvals", "edit_pending_approvals"],
  Activity: ["view_logs"],
  Messages: ["view_messages", "delete_messages"],
};

export default function Roles() {
  // State management
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingRoleId, setDeletingRoleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState(null);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    permissions: [],
  });
  const [editForm, setEditForm] = useState({
    name: "",
    permissions: [],
  });

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    fetchRoles();
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });

      if (response.status === 200) {
        setRoles(response.data.roles || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setRoles([]);
        throw new Error(response);
      }
    } catch (error) {
      console.error("Fetch roles error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch roles");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      // Validate required fields
      if (!createForm.name.trim()) {
        toast.error("Role name is required");
        return;
      }
      if (createForm.permissions.length === 0) {
        toast.error("At least one permission is required");
        return;
      }

      const response = await createRole(createForm);

      if (response.status === 201 || response.status === 200) {
        toast.success("Role created successfully");
        setCreateDialogOpen(false);
        setCreateForm({ name: "", permissions: [] });
        fetchRoles();
      } else {
        throw new Error("Failed to create role");
      }
    } catch (error) {
      console.error("Create role error:", error);
      toast.error(error.response?.data?.message || "Failed to create role");
    } finally {
      setCreating(false);
    }
  };

  const handleEditRole = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // Validate required fields
      if (!editForm.name.trim()) {
        toast.error("Role name is required");
        return;
      }
      if (editForm.permissions.length === 0) {
        toast.error("At least one permission is required");
        return;
      }

      const response = await updateRole(selectedRole._id, editForm);

      if (response.status === 200) {
        toast.success("Role updated successfully");
        setEditDialogOpen(false);
        setSelectedRole(null);
        fetchRoles();
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      console.error("Update role error:", error);
      toast.error(error.response?.data?.message || "Failed to update role");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      setDeletingRoleId(roleId);
      const response = await deleteRole(roleId);

      if (response.status === 200) {
        toast.success("Role deleted successfully");
        fetchRoles();
      } else {
        throw new Error("Failed to delete role");
      }
    } catch (error) {
      console.error("Delete role error:", error);
      toast.error(error.response?.data?.message || "Failed to delete role");
    } finally {
      setDeletingRoleId(null);
    }
  };

  const handleViewRole = (role) => {
    setSelectedRole(role);
    setViewDialogOpen(true);
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

  const openEditDialog = (role) => {
    setSelectedRole(role);
    setEditForm({
      name: role.name,
      permissions: [...role.permissions],
    });
    setEditDialogOpen(true);
  };

  const handlePermissionChange = (permission, checked, isEdit = false) => {
    const formKey = isEdit ? "editForm" : "createForm";
    const setForm = isEdit ? setEditForm : setCreateForm;

    setForm((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter((p) => p !== permission),
    }));
  };

  const formatPermissionName = (permission) => {
    return permission
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const PermissionSelector = ({
    selectedPermissions,
    onChange,
    isEdit = false,
  }) => (
    <div className="space-y-4 max-h-64 overflow-y-auto">
      {Object.entries(PERMISSION_GROUPS).map(([group, permissions]) => (
        <div key={group} className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            {group}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {permissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={`${isEdit ? "edit" : "create"}-${permission}`}
                  checked={selectedPermissions.includes(permission)}
                  onCheckedChange={(checked) =>
                    onChange(permission, checked, isEdit)
                  }
                />
                <Label
                  htmlFor={`${isEdit ? "edit" : "create"}-${permission}`}
                  className="text-sm cursor-pointer"
                >
                  {formatPermissionName(permission)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Role Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage user roles and permissions
            </p>
          </div>

          <PermissionGuard shouldReturnNull permission="create_roles">
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    Create a new role with specific permissions
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRole} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Role Name</Label>
                    <Input
                      id="name"
                      value={createForm.name}
                      onChange={(e) =>
                        setCreateForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter role name (2-20 characters)"
                      minLength={2}
                      maxLength={20}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <PermissionSelector
                      selectedPermissions={createForm.permissions}
                      onChange={handlePermissionChange}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCreateDialogOpen(false)}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={creating}>
                      {creating ? <Loader /> : "Create Role"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </PermissionGuard>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search roles by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles
          </CardTitle>
          <CardDescription>{roles.length} roles found</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No roles found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role._id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {role.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {role.permissions.slice(0, 3).map((permission) => (
                            <Badge
                              key={permission}
                              variant="secondary"
                              className="text-xs"
                            >
                              {formatPermissionName(permission)}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(role.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(role.updatedAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRole(role)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <PermissionGuard
                            shouldReturnNull
                            permission="edit_roles"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(role)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </PermissionGuard>
                          <PermissionGuard
                            shouldReturnNull
                            permission="delete_roles"
                          >
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Role
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the "
                                    {role.name}" role? This action cannot be
                                    undone and may affect users assigned to this
                                    role.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteRole(role._id)}
                                    className="bg-destructive text-white hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </PermissionGuard>
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

      {/* Edit Dialog */}
      <PermissionGuard shouldReturnNull permission="edit_roles">
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>
                Update role information and permissions
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditRole} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Role Name</Label>
                <Input
                  id="editName"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter role name (2-20 characters)"
                  minLength={2}
                  maxLength={20}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <PermissionSelector
                  selectedPermissions={editForm.permissions}
                  onChange={handlePermissionChange}
                  isEdit={true}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? <Loader /> : "Update Role"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PermissionGuard>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {selectedRole?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Role Name</Label>
                  <p className="mt-1 font-medium">{selectedRole.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Total Permissions
                  </Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {selectedRole.permissions.length} permissions
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedRole.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Modified</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedRole.updatedAt)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block">
                  Assigned Permissions
                </Label>
                <div className="space-y-3">
                  {Object.entries(PERMISSION_GROUPS).map(
                    ([group, permissions]) => {
                      const groupPermissions = permissions.filter((p) =>
                        selectedRole.permissions.includes(p)
                      );
                      if (groupPermissions.length === 0) return null;

                      return (
                        <div key={group}>
                          <Label className="text-sm font-medium">{group}</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {groupPermissions.map((permission) => (
                              <Badge
                                key={permission}
                                variant="secondary"
                                className="text-xs"
                              >
                                {formatPermissionName(permission)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
