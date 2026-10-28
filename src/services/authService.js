import api from "./api";

export const login = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data;
};

export const register = async ({ name, email, password, no_tlp }) => {
  const response = await api.post("/auth/registrasi", {
    name,
    email,
    password,
    no_tlp,
  });
  return response.data.data;
};
