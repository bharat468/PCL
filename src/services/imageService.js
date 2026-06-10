import api from "../configs/axios";

const getImages = (params) => {
  return api.get("/image", { params });
};

const uploadImage = (formData) => {
  return api.post("/image/upload", formData);
};

const updateImage = (id, formData) => {
  return api.put(`/image/${id}`, formData);
};
const deleteImage = (id) => {
  return api.delete(`/image/${id}`);
};

const getImageBySection = (section) => {
  return api.get(`/image/${section}`);
};

export { getImages, uploadImage, updateImage, deleteImage, getImageBySection };
