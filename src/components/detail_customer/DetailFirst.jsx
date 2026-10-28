import { FiPhone, FiCalendar, FiMail } from "react-icons/fi";
import formatDate from "../common/formatDate";
import { LABEL_COLORS } from "../../styles/color";

export default function DetailFirst({ card, getInitials, data, labelStyle }) {
  const label = data.risk_predictions?.[0]?.label ?? null;
  const labelText = label ?? "Belum dianalisis";

  return (
    <div style={{ ...card, display: "flex", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          width: "2rem",
          height: "2rem",
          padding: "1.5rem",
          backgroundColor: "#ffc4c4",
          color: "#ff0000",
        }}
      >
        {getInitials(data.full_name)}
      </div>
      <div className="profil">
        <div className="profil-in">
          <p>{data.full_name}</p>
          <span className="font-gray">{data.segment}</span>
          <div style={labelStyle(label)}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: LABEL_COLORS[label] || "#6b7280",
              }}
            />
            <span className="label-atrisk">{labelText}</span>
          </div>
        </div>
        <div className="font-gray profil-in">
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <FiPhone />
            <p>{data.phone}</p>
          </div>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <FiCalendar />
            <p>Bergabung {formatDate(data.join_date)}</p>
          </div>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <FiMail />
            <p>{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
