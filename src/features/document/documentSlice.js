import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    documents: null, // null initially to check if data needs to be fetched
    loading: false,
    searchTerm: "",
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    error: null,
    selectedDocument: null,
    // Dialog states
    createDialogOpen: false,
    editDialogOpen: false,
    viewDialogOpen: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    setCreateDialogOpen: (state, action) => {
      state.createDialogOpen = action.payload;
    },
    setEditDialogOpen: (state, action) => {
      state.editDialogOpen = action.payload;
      if (!action.payload) {
        state.selectedDocument = null; // Clear selected document when closing edit dialog
      }
    },
    setViewDialogOpen: (state, action) => {
      state.viewDialogOpen = action.payload;
      if (!action.payload) {
        state.selectedDocument = null; // Clear selected document when closing view dialog
      }
    },
    clearDocuments: (state) => {
      state.documents = null;
      state.error = null;
    },
    resetDocumentState: (state) => {
      state.documents = null;
      state.loading = false;
      state.searchTerm = "";
      state.currentPage = 1;
      state.totalPages = 1;
      state.itemsPerPage = 10;
      state.error = null;
      state.selectedDocument = null;
      state.createDialogOpen = false;
      state.editDialogOpen = false;
      state.viewDialogOpen = false;
    },
  },
});

export const {
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
  clearDocuments,
  resetDocumentState,
} = documentSlice.actions;

export default documentSlice.reducer;
