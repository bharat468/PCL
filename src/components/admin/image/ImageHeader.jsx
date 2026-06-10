import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PermissionGuard from "@/components/PermissionGuard";
import CreateImageDialog from "./CreateImageDialog";

export default function ImageHeader({
  createDialogOpen,
  setCreateDialogOpen,
  onCreateImage,
  uploading,
  createForm,
  setCreateForm,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Image Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize your website images
        </p>
      </div>

      <PermissionGuard shouldReturnNull permission="create_images">
        <CreateImageDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={onCreateImage}
          uploading={uploading}
          form={createForm}
          setForm={setCreateForm}
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload Image
            </Button>
          }
        />
      </PermissionGuard>
    </div>
  );
}
