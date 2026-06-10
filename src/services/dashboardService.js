import api from "../configs/axios";

const getDashboardStatistics = async () => {
  return api.get("/dashboard");
};

export { getDashboardStatistics };
