import axios from "axios";
import Cookies from "js-cookie";
import { navigateTo } from "../utils/navigation";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true, // 🔑 ensures cookies (like refresh token) are always sent
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {  
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = config.method ? config.method.toUpperCase() : "";
    if (["POST", "PUT", "PATCH"].includes(method)) {
      // Only set Content-Type to application/json if data is not FormData
      // FormData should set its own Content-Type with boundary
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest); // 🔑 retry with new token
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post("/auth/refresh", {});
        const newToken = data?.accessToken;

        if (newToken) {
          Cookies.set("accessToken", newToken);
          api.defaults.headers.common.Authorization = "Bearer " + newToken;
          processQueue(null, newToken);

          originalRequest.headers.Authorization = "Bearer " + newToken;
        }

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        Cookies.remove("accessToken");
        navigateTo("/", { replace: true });
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
