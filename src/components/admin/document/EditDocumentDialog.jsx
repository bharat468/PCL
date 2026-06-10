import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { updateDocument } from "../../../services/documentService";
import Loader from "../../../components/Loader";
import PermissionGuard from "../../../components/PermissionGuard";

export default function EditDocumentDialog({
  open,
  onOpenChange,
  document,
  onSuccess,
}) {
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (document) {
      setForm({
        title: document.title,
        description: document.description || "",
      });
    }
  }, [document]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document) return;

    setUpdating(true);
    try {
      const response = await updateDocument(document._id, form);

      if (response.status === 200) {
        toast.success("Document updated successfully");
        onOpenChange(false);
        onSuccess();
      } else {
        throw new Error("Failed to update document");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update document");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PermissionGuard shouldReturnNull permission="edit_documents">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>Update document information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Title</Label>
              <Input
                id="editTitle"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter document title"
                disabled={updating}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter document description (optional)"
                disabled={updating}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updating}>
                {updating ? <Loader /> : "Update Document"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
