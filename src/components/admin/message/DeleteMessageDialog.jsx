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
import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteMessage } from "@/services/messageService";
import { toast } from "sonner";

export default function DeleteMessageDialog({
  isOpen,
  onClose,
  message,
  onDeleteSuccess,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!message) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteMessage(message._id);

      if (response.status === 200) {
        onDeleteSuccess(message._id);
        toast.success("Message deleted successfully");
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      console.error("Delete message error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete message";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="h-5 w-5" />
            </div>
            Delete Message
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-amber-800 font-medium">
                    Are you sure you want to delete this message?
                  </p>
                  <p className="text-amber-700 text-sm">
                    This action cannot be undone. The message will be
                    permanently removed from the system.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">From:</span>
                    <p className="text-gray-900">{message.fullName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{message.emailAddress}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Subject:</span>
                  <p className="text-gray-900">{message.subject}</p>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Message
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
