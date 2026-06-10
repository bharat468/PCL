import { useState } from "react";
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
import { createDocument } from "../../../services/documentService";
import Loader from "../../../components/Loader";
import PermissionGuard from "../../../components/PermissionGuard";
import { validateFile } from "../../../utils/documentUtils";

export default function CreateDocumentDialog({
  open,
  onOpenChange,
  onSuccess,
}) {
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      if (!form.title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!form.file) {
        toast.error("Please select a file to upload");
        return;
      }

      const fileValidation = validateFile(form.file);
      if (!fileValidation.valid) {
        toast.error(fileValidation.error);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("file", form.file);

      const response = await createDocument(formData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Document created successfully");
        onOpenChange(false);
        setForm({ title: "", description: "", file: null });
        onSuccess();
      } else {
        throw new Error("Failed to create document");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create document");
    } finally {
      setCreating(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error);
        e.target.value = "";
        return;
      }
    }
    setForm((prev) => ({ ...prev, file }));
  };

  return (
    <PermissionGuard shouldReturnNull permission="create_documents">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
            <DialogDescription>
              Upload a new document to the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter document title"
                disabled={creating}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter document description (optional)"
                disabled={creating}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                disabled={creating}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
                required
              />
              {form.file && (
                <div className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                  <p>
                    <strong>Selected file:</strong> {form.file.name}
                  </p>
                  <p>
                    <strong>Size:</strong>{" "}
                    {(form.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p>
                    <strong>Type:</strong> {form.file.type || "Unknown"}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {creating ? <Loader /> : "Create Document"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
