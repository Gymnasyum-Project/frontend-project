import api from "./api";

export const getPackages = async () => {
  const res = await api.get("/packages");
  return res.data.data;
};

export const addPackage = async ({
  name,
  service_type,
  total_sessions,
  duration_days,
  price,
}) => {
  const res = await api.post("/packages", {
    name,
    service_type,
    total_sessions,
    duration_days,
    price,
  });
  return res.data.data;
};

export const addCustomerPackages = async ({
  customer_id,
  package_id,
  start_date,
}) => {
  const res = await api.post("/customer-packages", {
    customer_id,
    package_id,
    start_date,
  });
  return res.data.data;
};

export const updatePackage = async (id, payload) => {
  const res = await api.patch(`/packages/${id}`, payload);
  return res.data.data;
};
