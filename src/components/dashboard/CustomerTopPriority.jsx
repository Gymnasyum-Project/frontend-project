import DataTable from "../common/DataTable/DataTable";
import { LABEL_COLORS } from "../../styles/color";
import { useNavigate } from "react-router-dom";

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

function CustomerTopPriority({ top_priority = [], styleCard, LABEL_COLORS }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "1rem" }}>
      <div style={styleCard}>
        <div
          style={{
            borderBottom: "1px solid #D1D5DB",
            display: "grid",
            gridTemplateColumns: "4fr 1fr",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div>
            <p>Prioritas Follow-up</p>
            <p className="sub-gray-font">
              5 customer dengan resiko tertinggi yang perlu segera di hubungi
            </p>
          </div>
          <div style={{ textAlign: "end" }}>
            <button onClick={() => {}} className="btn-lihat-semua">
              Lihat Semua
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <DataTable
            filterData={top_priority}
            labelStyle={labelStyle}
            LABEL_COLORS={LABEL_COLORS}
            onDetail={(customer) => navigate(`/customer/${customer.id}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerTopPriority;
