import EmptyComponent from "../common/ErrorComponent/Emptycomponent";
export default function TabKehadiran({
  SESSION_STATUS,
  packageById,
  formatDateTime,
  formatService,
  history,
}) {
  if (history.length === 0) return <EmptyComponent />;

  return (
    <table>
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Tipe Sesi</th>
          <th>Pelatih</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {history.map((a) => {
          const pkg = packageById[a.customer_package_id];
          const st = SESSION_STATUS[a.status] || {
            label: a.status,
            color: "#6b7280",
            bg: "#f3f4f6",
          };
          return (
            <tr key={a.id}>
              <td style={{ padding: "0.5rem" }}>
                {formatDateTime(a.scheduled_at)}
              </td>
              <td>{formatService(pkg?.packages.service_type)}</td>
              <td>{a.coach_name}</td>
              <td>
                <span
                  style={{
                    background: st.bg,
                    color: st.color,
                    padding: "2px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {st.label}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
