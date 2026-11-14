import { IoIosWarning } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import "./PriorityFollowUpComponent.css";
import { useNavigate } from "react-router-dom";
import useGetPriority from "../../hooks/priorityFollowUp/useGetPriority";
import { COLORS } from "../../styles/color";
import CardPriority from "./CardPriority";
import ErrorComponent from "../common/ErrorComponent/ErrorComponent";
import LoadingComponent from "../common/loading/LoadingComponent";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";

export default function PriorityFollowUpComponent() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useGetPriority();

  if (loading) {
    return <LoadingComponent />;
  }
  if (!data) {
    return <EmptyComponent />;
  }
  if (error) return <ErrorComponent message={error} onRetry={refetch} />;

  const dataAtrisk = data.at_risk;
  const dataNeedAttention = data.need_attention;
  return (
    <div className="container-followup">
      <div
        className="card card-top"
        style={{
          backgroundColor: COLORS.red[50],
          color: COLORS.red[100],
        }}
      >
        <div>
          <IoIosWarning size={24} />
        </div>
        <div>
          <p>Perhatian: 5 customer beresiko tinggi</p>
          <p>
            Customer ini membutuhkan tidankan lanjut. Segera hubungi mereka
            untuk mencegah curn
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div>
            <FaCircle size={10} color={COLORS.red[100]} />
          </div>
          <div>
            <p>At Risk - Segera tindak lanjut</p>
          </div>
        </div>
        {(dataAtrisk ?? []).slice(0, 5).map((i) => {
          return (
            <CardPriority
              key={i.id}
              data={i}
              onDetail={() => navigate(`/customer/${i.id}`)}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div>
            <FaCircle size={10} color={COLORS.yellow[150]} />
          </div>
          <div>
            <p>Need Attention - Pantau lebih lanjut</p>
          </div>
        </div>
        {(dataNeedAttention ?? []).slice(0, 5).map((i) => {
          return (
            <CardPriority
              key={i.id}
              data={i}
              onDetail={() => navigate(`/customer/${i.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
