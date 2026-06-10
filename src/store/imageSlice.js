import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Data states
  images: null,
  totalPages: 1,

  // Filter states
  selectedSection: "",
  currentPage: 1,
  itemsPerPage: 10,

  // Loading states
  loading: false,

  // Dialog states
  createDialogOpen: false,
  editDialogOpen: false,
  viewDialogOpen: false,
  selectedImage: null,

  // Operation states
  uploading: false,
  updating: false,
  deletingImageId: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // Data actions
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    // Filter actions
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
      // Reset to page 1 when section changes
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      // Reset to page 1 when items per page changes
      state.currentPage = 1;
    },

    // Loading actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Dialog actions
    setCreateDialogOpen: (state, action) => {
      state.createDialogOpen = action.payload;
    },
    setEditDialogOpen: (state, action) => {
      state.editDialogOpen = action.payload;
    },
    setViewDialogOpen: (state, action) => {
      state.viewDialogOpen = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },

    // Operation actions
    setUploading: (state, action) => {
      state.uploading = action.payload;
    },
    setUpdating: (state, action) => {
      state.updating = action.payload;
    },
    setDeletingImageId: (state, action) => {
      state.deletingImageId = action.payload;
    },

    // Reset actions
    resetImageState: (state) => {
      return initialState;
    },
  },
});

export const {
  // Data actions
  setImages,
  setTotalPages,

  // Filter actions
  setSelectedSection,
  setCurrentPage,
  setItemsPerPage,

  // Loading actions
  setLoading,

  // Dialog actions
  setCreateDialogOpen,
  setEditDialogOpen,
  setViewDialogOpen,
  setSelectedImage,

  // Operation actions
  setUploading,
  setUpdating,
  setDeletingImageId,

  // Reset actions
  resetImageState,
} = imageSlice.actions;

export default imageSlice.reducer;
