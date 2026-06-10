import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  User,
  Calendar,
  MessageSquare,
  Copy,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ViewMessageDialog({ isOpen, onClose, message }) {
  if (!message) return null;

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy 'at' hh:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(message.emailAddress);
    toast.success("Email address copied to clipboard");
  };

  const handleEmailReply = () => {
    const subject = `Re: ${message.subject}`;
    const body = `Hi ${message.fullName},\n\nThank you for contacting us.\n\n`;
    const mailtoUrl = `mailto:${
      message.emailAddress
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            Contact Message Details
          </DialogTitle>
          <DialogDescription className="text-sm">
            View the complete message and sender information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Sender Information */}
          <div className="bg-gray-50 rounded-md p-3 space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              Sender Information
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Full Name
                </label>
                <p className="text-sm text-gray-900 bg-white px-2 py-1.5 rounded border">
                  {message.fullName}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900 bg-white px-2 py-1.5 rounded border flex-1 break-all">
                    {message.emailAddress}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="h-7 w-7 p-0 shrink-0"
                    title="Copy email"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Message Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Message Details
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Subject
                </label>
                <p className="text-sm text-gray-900 bg-gray-50 px-2 py-1.5 rounded border">
                  {message.subject}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Message
                </label>
                <div className="bg-gray-50 border rounded-md p-3 max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleEmailReply}
              className="flex items-center justify-center gap-2 w-full"
              size="sm"
            >
              <ExternalLink className="h-4 w-4" />
              Reply via Email
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
