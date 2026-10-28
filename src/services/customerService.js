import api from "./api";

export const getCustomer = async ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  const response = await api.get("/customers", {
    params: { page, limit, sort: "priority", search: search || undefined },
  });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}`);
  return res.data.data;
};

export const generateSummary = async (
  customerId,
  { regenerate = false } = {},
) => {
  // try {
  const res = await api.post(`/ai/summary/${customerId}`, { regenerate });
  return res.data.data;
  // } catch (err) {
  //   throw new Error(err.response?.data?.message || "Gagal Generate Draft");
  // }
};
export const updateSummary = async (id, payload) => {
  const response = await api.patch(`/ai/summary/${id}`, payload);
  return response.data.data;
};
