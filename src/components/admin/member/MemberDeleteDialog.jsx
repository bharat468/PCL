import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { softDeleteMember } from "@/services/memberService";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import PermissionGuard from "@/components/PermissionGuard";

export default function MemberDeleteDialog({
  member,
  open,
  onClose,
  onSuccess,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!member?._id) return;

    setDeleting(true);
    try {
      const response = await softDeleteMember(member._id);

      if (response.status === 200) {
        toast.success("Member deleted successfully");
        onClose();
        onSuccess();
      } else {
        throw new Error("Failed to delete member");
      }
    } catch (error) {
      console.error("Delete member error:", error);
      toast.error(error.response?.data?.message || "Failed to delete member");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PermissionGuard shouldReturnNull permission="delete_members">
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{member?.name}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? <Loader /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PermissionGuard>
  );
}
