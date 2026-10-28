import EmptyComponent from "../common/ErrorComponent/Emptycomponent";
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
            <th>Tanggal</th>
            <th>Reason</th>
            <th>Reschedule</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            console.log();
            return (
              <tr key={e.id}>
                <td>{e.package_name}</td>
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
