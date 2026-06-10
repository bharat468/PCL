import api from "../configs/axios";

const adminLogin = (data) => {
  return api.post("/auth/admin-login", data);
};

const validateToken = () => {
  return api.get("/auth/validate-token");
};

const logout = () => {
  return api.post("/auth/logout");
};

const memberLogin = (data) => {
  return api.post("/auth/member-login", data);
};

const validateMember = () => {
  return api.get("/auth/validate-member-token");
};

const changePassword = (data) => {
  return api.post("/auth/change-password", data);
};

export {
  adminLogin,
  validateToken,
  logout,
  memberLogin,
  validateMember,
  changePassword,
};
