import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  selectedMessage: null,
  viewDialogOpen: false,
  deleteDialogOpen: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Reset to first page when searching
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      // Reset to first page when changing items per page
      state.currentPage = 1;
    },
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    setViewDialogOpen: (state, action) => {
      state.viewDialogOpen = action.payload;
    },
    setDeleteDialogOpen: (state, action) => {
      state.deleteDialogOpen = action.payload;
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },
    resetState: () => initialState,
  },
});

export const {
  setMessages,
  setLoading,
  setError,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setSelectedMessage,
  setViewDialogOpen,
  setDeleteDialogOpen,
  deleteMessage,
  resetState,
} = messageSlice.actions;

export default messageSlice.reducer;
