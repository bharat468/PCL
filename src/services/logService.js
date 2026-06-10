import api from "../configs/axios";

const getLogs = (params) => {
  return api.get("/activity", { params });
};

export { getLogs };
