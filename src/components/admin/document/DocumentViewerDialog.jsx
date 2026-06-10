import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { toast } from "sonner";
import { viewDocument } from "@/services/documentService";
import Loader from "@/components/Loader";

export default function DocumentViewerDialog({ open, onOpenChange, document }) {
  const [loading, setLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [contentType, setContentType] = useState("");

  // Load document when dialog opens and document is available
  useEffect(() => {
    if (open && document && !documentUrl && !loading) {
      handleViewDocument();
    }
  }, [open, document, documentUrl, loading]);

  // Clean up blob URL when dialog closes or document changes
  useEffect(() => {
    if (!open) {
      if (documentUrl) {
        window.URL.revokeObjectURL(documentUrl);
        setDocumentUrl(null);
      }
      setContentType("");
    }
  }, [open, documentUrl]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (documentUrl) {
        window.URL.revokeObjectURL(documentUrl);
      }
    };
  }, [documentUrl]);

  const handleViewDocument = async () => {
    if (!document) return;

    try {
      setLoading(true);
      const response = await viewDocument(document._id);

      // Get content type from response headers
      const contentType =
        response.headers["content-type"] || "application/octet-stream";
      setContentType(contentType);

      // Check if file type is viewable
      const viewableTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "text/plain",
        "text/html",
      ];

      if (!viewableTypes.includes(contentType.toLowerCase())) {
        toast.error(
          `Cannot preview ${contentType} files. File type not supported for viewing.`
        );
        return;
      }

      // Create blob URL for viewing
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      setDocumentUrl(url);
    } catch (error) {
      console.error("Error viewing document:", error);

      if (error.response?.status === 404) {
        toast.error("Document not found");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to view this document");
      } else {
        toast.error("Failed to load document. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      // Clean up blob URL when closing
      if (documentUrl) {
        window.URL.revokeObjectURL(documentUrl);
        setDocumentUrl(null);
      }
      setContentType("");
      setLoading(false);
    }
    onOpenChange(isOpen);
  };

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-none w-screen h-screen p-0 m-0"
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg font-semibold truncate">
                {document.title}
              </h2>
            </div>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 overflow-hidden bg-muted/10 relative w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : documentUrl ? (
              <div className="h-full w-full relative">
                {contentType === "application/pdf" ? (
                  <div className="h-full w-full relative">
                    <iframe
                      src={`${documentUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
                      className="w-full h-full border-0"
                      title={document.title}
                      style={{
                        userSelect: "none",
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                ) : contentType.startsWith("image/") ? (
                  <div className="flex items-center justify-center h-full p-4">
                    <img
                      src={documentUrl}
                      alt={document.title}
                      className="max-w-full max-h-full object-contain select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </div>
                ) : contentType.startsWith("text/") ? (
                  <div className="h-full overflow-auto">
                    <iframe
                      src={documentUrl}
                      className="w-full h-full border-0"
                      title={document.title}
                      style={{
                        fontFamily: "monospace",
                        padding: "20px",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Preview not available for this file type</p>
                      <p className="text-sm">{contentType}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          {/* <div className="p-2 border-t bg-muted/30 flex justify-between items-center shrink-0">
            <div className="text-sm text-muted-foreground">
              Document viewing only - Download not available
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleOpenChange(false)}
            >
              Close Viewer
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
