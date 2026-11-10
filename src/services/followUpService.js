import api from "./api";

export const getDataPriority = async () => {
  const res = await api.get("/followups/priority-list");
  return res.data.data;
};
