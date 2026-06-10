import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <ShieldX className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-balance">
            You don't have permission to access this resource. Please contact
            your administrator if you believe this is an error.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate(-1)} className="w-full">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
