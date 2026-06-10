import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: null, // null initially to check if data needs to be fetched
    loading: false,
    searchTerm: "",
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
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
    clearMembers: (state) => {
      state.members = null;
      state.error = null;
    },
    resetMemberState: (state) => {
      state.members = null;
      state.loading = false;
      state.searchTerm = "";
      state.currentPage = 1;
      state.totalPages = 1;
      state.itemsPerPage = 10;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setMembers,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setError,
  clearMembers,
  resetMemberState,
} = memberSlice.actions;

export default memberSlice.reducer;
