import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Users, Calendar, Mail, Phone } from "lucide-react";
import MemberViewDialog from "./MemberViewDialog";
import MemberEditDialog from "./MemberEditDialog";
import MemberDeleteDialog from "./MemberDeleteDialog";
import PermissionGuard from "@/components/PermissionGuard";

export default function MemberTable({ members, loading, onMembersUpdate }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setViewDialogOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setEditDialogOpen(true);
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setSelectedMember(null);
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No members found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>PF Number</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Mail className="w-4 text-muted-foreground" />
                  {member.email}
                </TableCell>
                <TableCell>
                  {member.phone ? (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 text-muted-foreground" />
                      {member.phone}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not provided</span>
                  )}
                </TableCell>
                <TableCell>
                  {member.pf ? (
                    <Badge variant="secondary">{member.pf}</Badge>
                  ) : (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4" />
                    {formatDate(member.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMember(member)}
                    >
                      <Eye className="w-4" />
                    </Button>
                    <PermissionGuard shouldReturnNull permission="edit_members">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard
                      shouldReturnNull
                      permission="delete_members"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMember(member)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </PermissionGuard>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MemberViewDialog
        member={selectedMember}
        open={viewDialogOpen}
        onClose={handleCloseDialogs}
      />

      <MemberEditDialog
        member={selectedMember}
        open={editDialogOpen}
        onClose={handleCloseDialogs}
        onSuccess={onMembersUpdate}
      />

      <MemberDeleteDialog
        member={selectedMember}
        open={deleteDialogOpen}
        onClose={handleCloseDialogs}
        onSuccess={onMembersUpdate}
      />
    </>
  );
}
