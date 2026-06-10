import { LoaderIcon } from "lucide-react";
import { cn } from "../lib/utils";

export default function Loader({ className, ...props }) {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon className={cn("animate-spin text-black", className)} />
    </div>
  );
}
