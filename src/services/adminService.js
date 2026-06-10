import api from "../configs/axios";

const createAdmin = async (adminData) => {
  return api.post("/user/admin", adminData);
};

const updateAdmin = async (adminId, adminData) => {
  return api.put(`/user/admin/${adminId}`, adminData);
};

const deleteAdmin = async (adminId) => {
  return api.delete(`/user/admin/${adminId}`);
};

const getAdmins = async (params) => {
  return api.get("/user/admin", { params });
};

export default {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmins,
};
