import api from "../configs/axios";

const getApprovals = (params) => {
  return api.get("/approval", { params });
};

const createApproval = (data) => {
  return api.post("/approval", data);
};

// const updateApproval = (id, data) => {
//   return api.put(`/approval/${id}`, data);
// };

const getMyApprovals = (params) => {
  return api.get("/approval/my", { params });
};

const approveApproval = (id) => {
  return api.patch(`/approval/${id}/approve`);
};

const rejectApproval = (id, rejectionReason) => {
  return api.patch(`/approval/${id}/reject`, { reason: rejectionReason });
};

const deleteApproval = (id) => {
  return api.delete(`/approval/${id}`);
};
export {
  getApprovals,
  createApproval,
  //   updateApproval,
  approveApproval,
  deleteApproval,
  rejectApproval,
  getMyApprovals,
};
