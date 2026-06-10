import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Loader from "@/components/Loader";
import PermissionGuard from "@/components/PermissionGuard";

export default function ImageTable({
  images,
  loading,
  deletingImageId,
  onViewImage,
  onEditImage,
  onDeleteImage,
}) {
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

  if (loading || images === null) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (images?.length === 0) {
    return (
      <div className="text-center py-8">
        <img className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No images found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((image) => {
            const isDeleting = deletingImageId === image._id;
            return (
              <TableRow
                key={image._id}
                className={isDeleting ? "opacity-50" : ""}
              >
                <TableCell>
                  <div className="w-16 h-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/image-preview-concept.png";
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getSectionBadgeVariant(image.section)}
                    className="capitalize"
                  >
                    {image.section}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate font-mono text-sm text-wrap">
                  {image.url}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {image.uploadedBy?.name || "Unknown"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(image.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewImage(image)}
                      disabled={isDeleting}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <PermissionGuard shouldReturnNull permission="edit_images">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditImage(image)}
                        disabled={isDeleting}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard
                      shouldReturnNull
                      permission="delete_images"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Image</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this image from
                              the {image.section} section? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              disabled={deletingImageId === image._id}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDeleteImage(image._id)}
                              disabled={deletingImageId === image._id}
                              className="bg-destructive text-white hover:bg-destructive/90"
                            >
                              {deletingImageId === image._id ? (
                                <Loader />
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </PermissionGuard>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
