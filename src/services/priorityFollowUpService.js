import api from "./api";

export const getPriorityFollowUp = async () => {
  const response = await api.get("/followups/priority-list");

  return response.data.data;
};

export const getDraftFollowUp = async (customer_id) => {
  const response = await api.get(`/ai/customer/${customer_id}/followup-draft`);

  return response.data.data;
};
