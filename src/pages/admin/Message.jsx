import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { getMessages } from "@/services/messageService";
import MessageHeader from "@/components/admin/message/MessageHeader";
import MessageFilters from "@/components/admin/message/MessageFilters";
import MessageTable from "@/components/admin/message/MessageTable";
import MessagePagination from "@/components/admin/message/MessagePagination";
import ViewMessageDialog from "@/components/admin/message/ViewMessageDialog";
import DeleteMessageDialog from "@/components/admin/message/DeleteMessageDialog";
import {
  setLoading,
  setMessages,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setError,
  setSelectedMessage,
  setViewDialogOpen,
  setDeleteDialogOpen,
} from "@/features/message/messageSlice";
import { deleteMessage } from "../../features/message/messageSlice";

export default function Messages() {
  const dispatch = useDispatch();
  const {
    messages,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    itemsPerPage,
    selectedMessage,
    viewDialogOpen,
    deleteDialogOpen,
  } = useSelector((state) => state.message);

  const fetchMessages = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getMessages({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });

      if (response.status === 200) {
        dispatch(setMessages(response.data.messages || []));
        dispatch(setTotalPages(response.data.pagination?.totalPages || 1));
        dispatch(setError(null));
      } else {
        dispatch(setMessages([]));
        throw new Error(response);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch messages";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [hasInitialized, setHasInitialized] = useState(false);

  // Initial fetch
  useEffect(() => {
    if (!hasInitialized) {
      fetchMessages();
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  // Fetch when dependencies change
  useEffect(() => {
    if (hasInitialized) {
      fetchMessages();
    }
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleRefresh = () => {
    fetchMessages();
    toast.success("Messages refreshed successfully");
  };

  const handleViewMessage = (message) => {
    dispatch(setSelectedMessage(message));
    dispatch(setViewDialogOpen(true));
  };

  const handleDeleteMessage = (message) => {
    dispatch(setSelectedMessage(message));
    dispatch(setDeleteDialogOpen(true));
  };

  const handleDeleteSuccess = (deletedMessageId) => {
    dispatch(deleteMessage(deletedMessageId));
    dispatch(setDeleteDialogOpen(false));
    dispatch(setSelectedMessage(null));
    toast.success("Message deleted successfully");

    // If current page becomes empty and it's not the first page, go to previous page
    if (messages.length === 1 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      fetchMessages();
    }
  };

  return (
    <div className="space-y-6">
      <MessageHeader onRefresh={handleRefresh} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <MessageFilters />
        </div>

        <MessageTable
          onViewMessage={handleViewMessage}
          onDeleteMessage={handleDeleteMessage}
        />

        <div className="p-6 border-t border-gray-200">
          <MessagePagination />
        </div>
      </div>

      {/* Dialogs */}
      <ViewMessageDialog
        isOpen={viewDialogOpen}
        onClose={() => dispatch(setViewDialogOpen(false))}
        message={selectedMessage}
      />

      <DeleteMessageDialog
        isOpen={deleteDialogOpen}
        onClose={() => dispatch(setDeleteDialogOpen(false))}
        message={selectedMessage}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
