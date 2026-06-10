import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Mail, Calendar, User } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { format } from "date-fns";

export default function MessageTable({ onViewMessage, onDeleteMessage }) {
  const { messages, loading, error } = useSelector((state) => state.message);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Error Loading Messages
          </h3>
          <p className="text-gray-600 max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No Messages Found
          </h3>
          <p className="text-gray-600 max-w-md">
            No contact messages have been received yet. Messages from your
            website contact form will appear here.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[200px] font-semibold">Sender</TableHead>
            <TableHead className="font-semibold">Subject</TableHead>
            <TableHead className="w-[300px] font-semibold">
              Message Preview
            </TableHead>
            <TableHead className="w-[150px] font-semibold">Date</TableHead>
            <TableHead className="w-[100px] text-center font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message._id} className="hover:bg-gray-50">
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {truncateText(message.fullName, 20)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {truncateText(message.emailAddress, 25)}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="font-medium text-gray-900">
                  {truncateText(message.subject, 40)}
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {truncateText(message.message, 80)}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(message.createdAt)}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewMessage(message)}
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                    title="View message"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteMessage(message)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    title="Delete message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
