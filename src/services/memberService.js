import api from "../configs/axios";

const getMembers = async (params) => {
  return api.get("/user/member", { params });
};

const createMember = async (data) => {
  return api.post("/user/member", data);
};

const updateMember = async (id, data) => {
  return api.put(`/user/member/${id}`, data);
};

const softDeleteMember = async (id) => {
  return api.delete(`/user/member/${id}`);
};

const restoreMember = async (id) => {
  return api.post(`/user/member/${id}/restore`);
};

const getMemberById = async (id) => {
  return api.get(`/user/member/${id}`);
};

const bulkUploadUsers = async (users) => {
  return api.post("/user/member/bulk", users);
};

const birthdays = async () => {
  return api.get("/user/birthdays");
};

export {
  getMembers,
  createMember,
  updateMember,
  birthdays,
  getMemberById,
  softDeleteMember,
  restoreMember,
  bulkUploadUsers,
};
