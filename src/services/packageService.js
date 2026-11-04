import api from "./api";

export const getPackages = async () => {
  const res = await api.get("/packages");
  return res.data.data;
};

export const addPackages = async ({ customer_id, package_id, start_date }) => {
  const res = await api.post("/customer-packages", {
    customer_id,
    package_id,
    start_date,
  });
  return res.data.data;
};
