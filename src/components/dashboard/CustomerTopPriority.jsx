import DataTable from "../common/DataTable/DataTable";
import { labelStyle } from "../../styles/color";
import { useNavigate } from "react-router-dom";

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
            <p>Prioritas Follow-Up</p>
            <p className="gray-font">
              5 customer dengan resiko tertinggi yang perlu segera di hubungi
            </p>
          </div>
          <div style={{ textAlign: "end" }}>
            <button
              onClick={() => navigate("/priority-followup")}
              className="btn btn-lihat-semua"
            >
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
