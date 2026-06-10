import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { Edit, Eye, Trash2, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { deleteDocument } from "../../../services/documentService";
import Loader from "../../../components/Loader";
import PermissionGuard from "../../../components/PermissionGuard";
import { formatFileSize, formatDate } from "@/utils/documentUtils";

export default function DocumentTableRow({
  document,
  onEdit,
  onView,
  onRefresh,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteDocument(document._id);
      if (response.status === 200) {
        toast.success("Document deleted successfully");
        onRefresh();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TableRow className={isDeleting ? "opacity-50" : ""}>
      <TableCell className="font-medium">{document.title}</TableCell>
      <TableCell className="max-w-xs truncate">
        {document.description || "No description"}
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="uppercase">
          {document.format ?? "N/A"}
        </Badge>
      </TableCell>
      <TableCell>{formatFileSize(document.size)}</TableCell>
      <TableCell className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        {document.uploadedBy?.name || "Unknown"}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(document.createdAt)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(document)}
            disabled={isDeleting}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <PermissionGuard shouldReturnNull permission="edit_documents">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(document)}
              disabled={isDeleting}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </PermissionGuard>

          <PermissionGuard shouldReturnNull permission="delete_documents">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isDeleting}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Document</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{document.title}"? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting ? <Loader /> : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PermissionGuard>
        </div>
      </TableCell>
    </TableRow>
  );
}
