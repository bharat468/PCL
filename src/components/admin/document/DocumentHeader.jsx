import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PermissionGuard from "../../../components/PermissionGuard";

export default function DocumentHeader({ onCreateClick }) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Document Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your documents
          </p>
        </div>
        <PermissionGuard shouldReturnNull permission="create_documents">
          <Button className="flex items-center gap-2" onClick={onCreateClick}>
            <Plus className="h-4 w-4" />
            Add Document
          </Button>
        </PermissionGuard>
      </div>
    </div>
  );
}
