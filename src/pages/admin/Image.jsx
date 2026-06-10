import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import {
  getImages,
  uploadImage,
  updateImage,
  deleteImage,
} from "../../services/imageService";
import { toast } from "sonner";

// Redux actions
import {
  setImages,
  setTotalPages,
  setSelectedSection,
  setCurrentPage,
  setItemsPerPage,
  setLoading,
  setCreateDialogOpen,
  setEditDialogOpen,
  setViewDialogOpen,
  setSelectedImage,
  setUploading,
  setUpdating,
  setDeletingImageId,
} from "@/store/imageSlice";

// Import our new components
import ImageHeader from "../../components/admin/image/ImageHeader";
import ImageFilters from "../../components/admin/image/ImageFilters";
import ImageTable from "../../components/admin/image/ImageTable";
import EditImageDialog from "../../components/admin/image/EditImageDialog";
import ViewImageDialog from "../../components/admin/image/ViewImageDialog";
import Pagination from "../../components/admin/image/Pagination";

export default function Images() {
  const dispatch = useDispatch();

  // Local state for forms (don't need to be in Redux)
  const [createForm, setCreateForm] = useState({
    section: "",
    file: null,
  });
  const [editForm, setEditForm] = useState({
    section: "",
  });

  // Get states from Redux
  const {
    images,
    totalPages,
    selectedSection,
    currentPage,
    itemsPerPage,
    selectedImage,
    createDialogOpen,
    editDialogOpen,
    viewDialogOpen,
    loading,
    uploading,
    updating,
    deletingImageId,
  } = useSelector((state) => state.image);

  useEffect(() => {
    fetchImages();
  }, [currentPage, itemsPerPage, selectedSection]);

  // Reset to page 1 when section filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      dispatch(setCurrentPage(1));
    }
  }, [selectedSection]);

  const fetchImages = async () => {
    dispatch(setLoading(true));
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (selectedSection) {
        params.section = selectedSection;
      }

      const response = await getImages(params);

      if (response.status === 200) {
        dispatch(setImages(response.data.images || []));
        dispatch(setTotalPages(response.data.pagination?.totalPages || 1));
      } else {
        dispatch(setImages([]));
        throw new Error(response);
      }
    } catch (error) {
      console.error("Fetch images error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch images");
      dispatch(setImages([]));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateImage = async (e) => {
    e.preventDefault();
    dispatch(setUploading(true));
    try {
      if (!createForm.section.trim()) {
        toast.error("Section is required");
        return;
      }
      if (!createForm.file) {
        toast.error("Image file is required");
        return;
      }

      const formData = new FormData();
      formData.append("section", createForm.section);
      formData.append("image", createForm.file);

      const response = await uploadImage(formData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Image uploaded successfully");
        dispatch(setCreateDialogOpen(false));
        setCreateForm({ section: "", file: null });
        fetchImages();
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload image error:", error);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      dispatch(setUploading(false));
    }
  };

  const handleEditImage = async (e) => {
    e.preventDefault();
    dispatch(setUpdating(true));
    try {
      if (!editForm.section.trim()) {
        toast.error("Section is required");
        return;
      }

      const response = await updateImage(selectedImage._id, {
        section: editForm.section,
      });

      if (response.status === 200) {
        toast.success("Image updated successfully");
        handleCloseEditDialog();
        fetchImages();
      } else {
        throw new Error("Failed to update image");
      }
    } catch (error) {
      console.error("Update image error:", error);
      toast.error(error.response?.data?.message || "Failed to update image");
    } finally {
      dispatch(setUpdating(false));
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      dispatch(setDeletingImageId(imageId));
      const response = await deleteImage(imageId);

      if (response.status === 200) {
        toast.success("Image deleted successfully");
        fetchImages();
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Delete image error:", error);
      toast.error(error.response?.data?.message || "Failed to delete image");
    } finally {
      dispatch(setDeletingImageId(null));
    }
  };

  const handleViewImage = (image) => {
    dispatch(setSelectedImage(image));
    dispatch(setViewDialogOpen(true));
  };

  const openEditDialog = (image) => {
    dispatch(setSelectedImage(image));
    setEditForm({ section: image.section });
    dispatch(setEditDialogOpen(true));
  };

  const handleCloseEditDialog = () => {
    dispatch(setEditDialogOpen(false));
    dispatch(setSelectedImage(null));
    setEditForm({ section: "" });
    dispatch(setUpdating(false));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <ImageHeader
          createDialogOpen={createDialogOpen}
          setCreateDialogOpen={(val) => dispatch(setCreateDialogOpen(val))}
          onCreateImage={handleCreateImage}
          uploading={uploading}
          createForm={createForm}
          setCreateForm={setCreateForm}
        />

        {/* Search and Filters */}
        <ImageFilters
          selectedSection={selectedSection}
          setSelectedSection={(val) => dispatch(setSelectedSection(val))}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(val) => dispatch(setItemsPerPage(val))}
        />
      </div>

      {/* Image Table */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Images
            </CardTitle>
            <CardDescription>
              Manage gallery images and their sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageTable
              images={images}
              loading={loading}
              deletingImageId={deletingImageId}
              onEditImage={openEditDialog}
              onViewImage={handleViewImage}
              onDeleteImage={handleDeleteImage}
            />
          </CardContent>
        </Card>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(val) => dispatch(setCurrentPage(val))}
        />
      )}

      {/* Edit Image Dialog */}
      <EditImageDialog
        open={editDialogOpen}
        onOpenChange={(val) => dispatch(setEditDialogOpen(val))}
        image={selectedImage}
        form={editForm}
        setForm={setEditForm}
        onSubmit={handleEditImage}
        updating={updating}
        onClose={handleCloseEditDialog}
      />

      {/* View Image Dialog */}
      <ViewImageDialog
        open={viewDialogOpen}
        onOpenChange={(val) => dispatch(setViewDialogOpen(val))}
        image={selectedImage}
      />
    </div>
  );
}
