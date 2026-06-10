import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { getDocuments } from "@/services/documentService";
import DocumentHeader from "@/components/admin/document/DocumentHeader";
import DocumentFilters from "@/components/admin/document/DocumentFilters";
import DocumentTable from "@/components/admin/document/DocumentTable";
import DocumentPagination from "@/components/admin/document/DocumentPagination";
import CreateDocumentDialog from "@/components/admin/document/CreateDocumentDialog";
import EditDocumentDialog from "@/components/admin/document/EditDocumentDialog";
import DocumentViewerDialog from "@/components/admin/document/DocumentViewerDialog";
import {
  setLoading,
  setDocuments,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setError,
  setSelectedDocument,
  setCreateDialogOpen,
  setEditDialogOpen,
  setViewDialogOpen,
} from "@/features/document/documentSlice";

export default function Documents() {
  const dispatch = useDispatch();
  const {
    documents,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    itemsPerPage,
    selectedDocument,
    createDialogOpen,
    editDialogOpen,
    viewDialogOpen,
  } = useSelector((state) => state.document);

  const fetchDocuments = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getDocuments({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });

      if (response.status === 200) {
        dispatch(setDocuments(response.data.documents));
        dispatch(setTotalPages(response.data.pagination.totalPages));
        dispatch(setError(null));
      } else {
        dispatch(setDocuments([]));
        throw new Error(response);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch documents";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, itemsPerPage, searchTerm]);

  const openEditDialog = (document) => {
    dispatch(setSelectedDocument(document));
    dispatch(setEditDialogOpen(true));
  };

  const openViewDialog = (document) => {
    dispatch(setSelectedDocument(document));
    dispatch(setViewDialogOpen(true));
  };

  const handleSetSearchTerm = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleSetItemsPerPage = (limit) => {
    dispatch(setItemsPerPage(limit));
  };

  const handleSetCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateDialogOpen = (open) => {
    dispatch(setCreateDialogOpen(open));
  };

  const handleEditDialogOpen = (open) => {
    dispatch(setEditDialogOpen(open));
  };

  const handleViewDialogOpen = (open) => {
    dispatch(setViewDialogOpen(open));
  };

  return (
    <div className="">
      <DocumentHeader onCreateClick={() => handleCreateDialogOpen(true)} />

      <DocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearchTerm}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleSetItemsPerPage}
      />

      <DocumentTable
        documents={documents || []}
        loading={loading}
        onEdit={openEditDialog}
        onView={openViewDialog}
        onRefresh={fetchDocuments}
      />

      {totalPages > 1 && (
        <DocumentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleSetCurrentPage}
        />
      )}

      <CreateDocumentDialog
        open={createDialogOpen}
        onOpenChange={handleCreateDialogOpen}
        onSuccess={fetchDocuments}
      />

      <EditDocumentDialog
        open={editDialogOpen}
        onOpenChange={handleEditDialogOpen}
        document={selectedDocument}
        onSuccess={fetchDocuments}
      />

      <DocumentViewerDialog
        open={viewDialogOpen}
        onOpenChange={handleViewDialogOpen}
        document={selectedDocument}
      />
    </div>
  );
}
