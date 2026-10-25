import "./DataTable.css";
import AttendanceBar from "../AttendanceBar/AttendanceBar";
import formatDate from "../formatDate";
const getInitials = (name) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default function DataTable({ filterData, labelStyle, LABEL_COLORS }) {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Nama</th>
          <th className="hide-mobile">Segment</th>
          <th>Status Resiko</th>
          <th>Skor Resiko</th>
          <th className="hide-mobile">Kehadiran (30)</th>
          <th className="hide-mobile">Sisa Paket</th>
          <th className="hide-mobile">Terakhir Hadir</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {filterData.map((e) => (
          <tr key={e.id} style={{ borderBottom: "0.06rem solid #D1D5DB" }}>
            <td
              className="cellBody"
              style={{
                textAlign: "start",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "30px",
                  width: "2rem",
                  height: "2rem",
                  backgroundColor: "#ffc4c4",
                  color: "#ff0000",
                }}
              >
                {getInitials(e.full_name)}
              </div>
              <div>
                <p>{e.full_name}</p>
                <p className="sub-gray-font">{e.phone}</p>
              </div>
            </td>
            <td className="hide-mobile">{e.segment}</td>
            <td className="cellBody">
              <div style={labelStyle(e.risk_label)}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: LABEL_COLORS[e.risk_label] || "#6b7280",
                  }}
                />
                <span className="label-atrisk">{e.risk_label}</span>
              </div>
            </td>
            <td className="cellBody">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: `${Number(e.priority_score)}%`,
                    height: 8,
                    borderRadius: "30px",
                    backgroundColor: LABEL_COLORS[e.risk_label],
                  }}
                />

                <span>{Number(e.priority_score)}%</span>
              </div>
            </td>
            <td className="hide-mobile">
              <AttendanceBar value={e.attendance_30d} />
            </td>
            <td className="hide-mobile">{e.remaining_sessions} Sesi</td>
            <td className="hide-mobile">{formatDate(e.package_end_date)}</td>
            <td>
              <button className="btn" style={{ border: "1px solid #14b8a6" }}>
                Lihat Detail
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
