import api from "./api";

export const getPriorityFollowUp = async () => {
  const response = await api.get("/followups/priority-list");
  console.log(response.data);
  return response.data;
};
