import api from "./api";

export const addCustomer = async ({
  full_name,
  phone,
  email,
  birth_date,
  package_id,
  segment,
  service_type,
  join_date,
  notes,
}) => {
  const res = await api.post("/customers", {
    full_name,
    phone,
    email,
    birth_date,
    package_id,
    segment,
    service_type,
    join_date,
    notes,
  });
  return res.data.data;
};

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
  const res = await api.post(`/ai/summary/${customerId}`, { regenerate });
  return res.data.data;
};
export const updateSummary = async (id, payload) => {
  const response = await api.patch(`/ai/summary/${id}`, payload);
  return response.data.data;
};

export const getCustomerPackages = async (customerId) => {
  const response = await api.get(`/customer-packages/${customerId}`);
  return response.data.data;
};

export const addCustomerPackages = async (customerId, payload) => {
  const response = await api.post(`/customer-packages/${customerId}`, payload);
  return response.data.data;
};
