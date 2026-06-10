import api from "../configs/axios";

const getRoles = (params) => {
  return api.get("/role", { params });
};

const createRole = (data) => {
  return api.post("/role", data);
};

const updateRole = (roleId, data) => {
  return api.put(`/role/${roleId}`, data);
};

const deleteRole = (roleId) => {
  return api.delete(`/role/${roleId}`);
};

const assignRoleToUser = (roleId, userId) => {
  return api.post(`/role/${roleId}/assign`, { userId });
};

export { getRoles, createRole, updateRole, deleteRole, assignRoleToUser };
