import api from "../configs/axios";

const createMessage = async (messageData) => {
  return api.post("/message", messageData);
};

const getMessages = async (params = {}) => {
  return api.get("/message", { params });
};

const getMessageById = async (id) => {
  return api.get(`/message/${id}`);
};

const deleteMessage = async (id) => {
  return api.delete(`/message/${id}`);
};

// Individual exports (if you prefer importing specific functions)
export { createMessage, getMessages, getMessageById, deleteMessage };
