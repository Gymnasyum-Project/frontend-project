import api from "./api";

export const addAttendance = async ({
  checkin_at,
  coach_name,
  customer_id,
  customer_package_id,
  scheduled_at,
  status,
}) => {
  const res = await api.post("/attendance", {
    checkin_at,
    coach_name,
    customer_id,
    customer_package_id,
    scheduled_at,
    status,
  });
  return res.data.data;
};

export const getCustomerSessions = (customerId) =>
  api
    .get(`/attendance`, { params: { customer_id: customerId } })
    .then((r) => r.data.data);

export const rescheduleSession = (attendanceId, payload) =>
  api
    .post(`/attendance/${attendanceId}/reschedule`, payload)
    .then((r) => r.data.data);
