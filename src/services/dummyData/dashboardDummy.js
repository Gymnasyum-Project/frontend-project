export const dashboardDummy = {
  total_customers: 30,
 
  risk_predictions: [
    { label: "Active", total: 13 },
    { label: "At Risk", total: 7 },
    { label: "Need Attention", total: 10 },
  ],
 
  top_priority: [
    {
      id: 64,
      full_name: "Slamet Indrajaya",
      segment: "lainnya",
      label: "At Risk",
      priority_score: "96",
      remaining_sessions: 1,
      last_visit: null,
    },
    {
      id: 56,
      full_name: "Joko Susilo",
      segment: "lainnya",
      label: "At Risk",
      priority_score: "91",
      remaining_sessions: 0,
      last_visit: "2026-10-06T00:00:00.000Z",
    },
    {
      id: 60,
      full_name: "Tono Wijaya",
      segment: "ibu_ibu",
      label: "At Risk",
      priority_score: "90",
      remaining_sessions: 0,
      last_visit: "2026-10-10T00:00:00.000Z",
    },
    {
      id: 50,
      full_name: "Budi Setiawan",
      segment: "lansia",
      label: "Need Attention",
      priority_score: "56",
      remaining_sessions: 3,
      last_visit: "2026-10-06T00:00:00.000Z",
    },
    {
      id: 66,
      full_name: "Rizky Pratama",
      segment: "lansia",
      label: "Active",
      priority_score: "20",
      remaining_sessions: 2,
      last_visit: "2026-10-26T00:00:00.000Z",
    }
  ],
 
  anttendance_trend: [
    { week: "2026-08-23T00:00:00.000Z", hadir: 20, total: 31 },
    { week: "2026-08-30T00:00:00.000Z", hadir: 15, total: 27 },
    { week: "2026-09-7T00:00:00.000Z", hadir: 32, total: 38 },
    { week: "2026-09-14T00:00:00.000Z", hadir: 24, total: 35 },
    { week: "2026-09-21T00:00:00.000Z", hadir: 25, total: 50 },
    { week: "2026-09-28T00:00:00.000Z", hadir: 22, total: 45 },
    { week: "2026-10-05T00:00:00.000Z", hadir: 44, total: 55 },
    { week: "2026-10-12T00:00:00.000Z", hadir: 38, total: 45 },
  ],
};
 