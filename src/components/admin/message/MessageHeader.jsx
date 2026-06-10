import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare, Mail } from "lucide-react";
import { useSelector } from "react-redux";

export default function MessageHeader({ onRefresh }) {
  const { loading } = useSelector((state) => state.message);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          Manage messages from website visitors
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
    </div>
  );
}
