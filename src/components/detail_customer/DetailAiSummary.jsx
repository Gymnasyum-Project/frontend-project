import { FaGraduationCap } from "react-icons/fa6";
import { LABEL_COLORS } from "../../styles/color";

const labelStyle = (value) => {
  const color = LABEL_COLORS[value] || "#6b7280";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: color + "1a",
    color: color,
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  };
};
export default function DetailAiSummary({ data }) {
  const dataLabel = data.risk_predictions?.[0]?.label ?? null;
  const label = dataLabel ?? "Belum dianalisi";

  const score = Number(data.risk_predictions?.[0]?.priority_score ?? 0);
  const percent = Math.min(100, Math.max(0, score));
  return (
    <div className="ai-summary-card">
      <div className="judul-ai">
        <p>
          <FaGraduationCap /> Analisis AI
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        <div style={{ ...labelStyle(label), justifyContent: "center" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: LABEL_COLORS[label] || "#6b7280",
            }}
          />
          <span>{label}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: `${percent}%`,
              height: 8,
              borderRadius: "30px",
              backgroundColor: LABEL_COLORS[label],
            }}
          />
          <span>{percent}%</span>
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <p className="font-gray" style={{ fontWeight: "bold" }}>
          Faktor Resiko Utama
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "flex-start",
          }}
        >
          <ul style={{ listStyleType: "disc", margin: 0, paddingLeft: "20px" }}>
            {data.risk_predictions?.[0]?.top_factors?.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
