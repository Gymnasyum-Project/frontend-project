import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import formatDateTime from "../common/formatDate";
export default function TabReschedule({ data }) {
  if (data.length === 0) {
    return <EmptyComponent />;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sesi</th>
            <th>Jadwal Sebelumnya</th>
            <th>Reason</th>
            <th>Jadwal Baru</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id}>
                <td style={{ padding: "0.5rem" }}>{e.package_name}</td>
                <td>{formatDateTime(e.old_schedule)}</td>
                <td>{e.reason}</td>
                <td>{formatDateTime(e.new_schedule)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
