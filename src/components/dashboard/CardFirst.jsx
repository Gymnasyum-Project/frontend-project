import {
  IoPeople,
  IoCheckmarkCircle,
  IoWarning,
  IoAlert,
} from "react-icons/io5";
import { COLORS } from "../../styles/color";

function CardFirst({ totalCustomers, riskPredictions = [], styleCard }) {
  const countOf = (label) =>
    riskPredictions.find((r) => r.label === label)?.total ?? 0;
  const icons = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "1.5rem",
    height: "1.5rem",
    minWidth: "1.5rem",
    borderRadius: "10px",
  };
  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <div style={styleCard}>
          <div style={{ ...icons, backgroundColor: "#ccfbf1" }}>
            <IoPeople style={{ color: COLORS.green[200] }} />
          </div>
          <p style={{ fontSize: "25px" }}>{totalCustomers}</p>
          <p style={{ fontSize: "12px", color: "#9CA3Af" }}>Total Customer</p>
        </div>
        <div style={styleCard}>
          <div style={{ ...icons, backgroundColor: "#ccfbf1" }}>
            <IoCheckmarkCircle style={{ color: COLORS.green[300] }} />
          </div>
          <p style={{ fontSize: "25px" }}>{countOf("Active")}</p>
          <p style={{ fontSize: "12px", color: "#9CA3Af" }}>Active</p>
        </div>
        <div style={styleCard}>
          <div style={{ ...icons, backgroundColor: "#faf5c8" }}>
            <IoWarning style={{ color: COLORS.yellow[100] }} />
          </div>
          <p style={{ fontSize: "25px" }}>{countOf("Need Attention")}</p>
          <p style={{ fontSize: "12px", color: "#9CA3Af" }}>Need Attention</p>
        </div>
        <div style={styleCard}>
          <div style={{ ...icons, backgroundColor: "#ffc4c4" }}>
            <IoAlert style={{ color: COLORS.red[100] }} />
          </div>
          <p style={{ fontSize: "25px" }}>{countOf("At Risk")}</p>
          <p style={{ fontSize: "12px", color: "#9CA3Af" }}>At Risk</p>
        </div>
      </div>
    </>
  );
}

export default CardFirst;
