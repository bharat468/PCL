import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Eye, HardDrive, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import { formatFileSize, formatDate } from "@/utils/documentUtils";

export default function ViewDocumentDialog({ open, onOpenChange, document }) {
  const handleViewDocument = () => {
    // TODO: Replace with actual document download/view logic
    toast.info("Document viewing functionality to be implemented");
  };

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {document.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Description</Label>
              <p className="mt-1">{document.description || "No description"}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Format</Label>
              <p className="mt-1">
                <Badge variant="secondary" className="uppercase">
                  {document.format}
                </Badge>
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Size</Label>
              <p className="mt-1 flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                {formatFileSize(document.size)}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Uploaded By</Label>
              <p className="mt-1 flex items-center gap-2">
                <User className="h-4 w-4" />
                {document.uploadedBy?.name || "Unknown"}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Created</Label>
              <p className="mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(document.createdAt)}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Last Modified</Label>
              <p className="mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(document.updatedAt)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button className="w-full" onClick={handleViewDocument}>
              <Eye className="h-4 w-4 mr-2" />
              View Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
