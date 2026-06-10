import BulkUploadDialog from "./BulkUploadDialog";
import DownloadTemplateButton from "./DownloadTemplateButton";
import MemberCreateDialog from "./MemberCreateDialog";

export default function MemberHeader({ onMembersUpdate }) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Member Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your members
          </p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <DownloadTemplateButton />
          <BulkUploadDialog onSuccess={onMembersUpdate} />
          <MemberCreateDialog onSuccess={onMembersUpdate} />
        </div>
      </div>
    </div>
  );
}
