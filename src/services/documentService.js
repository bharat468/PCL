import api from "../configs/axios";

const getDocuments = async (params) => {
  return api.get("/document", { params });
};

const viewDocument = async (documentId) => {
  return api.get(`/document/${documentId}/stream`, { responseType: "blob" });
};

const deleteDocument = async (documentId) => {
  return api.delete(`/document/${documentId}`);
};

const createDocument = async (data) => {
  return api.post("/document", data);
};

const updateDocument = async (documentId, data) => {
  return api.put(`/document/${documentId}`, data);
};

export {
  getDocuments,
  viewDocument,
  deleteDocument,
  createDocument,
  updateDocument,
};
