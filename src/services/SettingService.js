import api from "./api";

export const getUser = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

export const updateUser = async (payload) => {
  const res = await api.patch("/auth/me", payload);
  return res.data;
};

export const getModelVersion = async () => {
  const res = await api.get("/model-versions");
  return res.data.data;
};
