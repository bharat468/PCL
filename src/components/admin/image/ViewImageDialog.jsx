import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ImageIcon, Calendar, User, ExternalLink } from "lucide-react";

export default function ViewImageDialog({ open, onOpenChange, image }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSectionBadgeVariant = (section) => {
    const variants = {
      gallery: "outline",
      banner: "default",
    };
    return variants[section] || "secondary";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Details
          </DialogTitle>
        </DialogHeader>
        {image && (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="w-full max-h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={image.url || "/placeholder.svg"}
                alt="Full preview"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = "/image-preview-concept.png";
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Section</Label>
                <p className="mt-1">
                  <Badge
                    variant={getSectionBadgeVariant(image.section)}
                    className="capitalize"
                  >
                    {image.section}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Uploaded By</Label>
                <p className="mt-1 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {image.uploadedBy?.name || "Unknown"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(image.createdAt)}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Modified</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(image.updatedAt)}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Image URL</Label>
              <p className="mt-1 font-mono text-sm bg-muted p-2 rounded break-all">
                {image.url}
              </p>
            </div>

            <div className="border-t pt-4">
              <Button
                className="w-full"
                onClick={() => {
                  window.open(image.url, "_blank");
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Image in New Tab
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
