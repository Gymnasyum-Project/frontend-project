import api from "./api";

export const createReminder = (payload) =>
  api.post("/reminders", payload).then((r) => r.data.data);

export const updateReminder = async (id, payload) => {
  const res = await api
    .patch(`/reminders/${id}`, payload)
    .then((r) => r.data.data);
  return res;
};
