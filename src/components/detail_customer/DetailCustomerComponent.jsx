import { useParams, useNavigate } from "react-router-dom";
import useCustomerDetail from "../../hooks/useDetailCustomer";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorComponent from "../common/ErrorComponent/Errorcomponent";
import EmptyComponent from "../common/ErrorComponent/Emptycomponent";
import { Link } from "react-router-dom";
import { LABEL_COLORS } from "../../styles/color";
// import formatDate from "../common/formatDate";
import DetailFirst from "./DetailFirst";
import DetailSecond from "./DetailSecond";
import DetailThree from "./DetailThree";

import "./DetailCustomerComponent.css";

const card = {
  backgroundColor: "#F9FAFB",
  boxShadow: "0 0 0 2px rgba(203, 213, 225, 0.2)",
  padding: "1rem",
  borderRadius: "10px",
};

const getInitials = (name) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};
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

export default function DetailCustomerComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useCustomerDetail(id);
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;
  if (!data) return <EmptyComponent />;

  console.log();
  return (
    <div className="container-detail">
      <div className="back-link">
        <Link className="font-gray" onClick={() => navigate(-1)}>
          ← Kembali ke Daftar Customer
        </Link>
      </div>
      <DetailFirst
        data={data}
        card={card}
        getInitials={getInitials}
        labelStyle={labelStyle}
      />
      <DetailSecond data={data} card={card} />
      <DetailThree data={data} card={card} />
    </div>
  );
}
