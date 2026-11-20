import { useParams, useNavigate } from "react-router-dom";
import { useDetailCustomer } from "../../hooks/customer/useDetailCustomer";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorComponent from "../common/ErrorComponent/ErrorComponent";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import { labelStyle, card } from "../../styles/color";
import DetailFirst from "./DetailFirst";
import DetailSecond from "./DetailSecond";
import DetailThree from "./DetailThree";

import "./DetailCustomerComponent.css";

const getInitials = (name) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default function DetailCustomerComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useDetailCustomer(id);
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;
  if (!data) return <EmptyComponent />;

  return (
    <div className="container-detail">
      <div className="back-link">
        <button
          type="button"
          className="font-gray"
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← Kembali ke Daftar Customer
        </button>
      </div>
      <DetailFirst
        data={data}
        card={card}
        getInitials={getInitials}
        labelStyle={labelStyle}
      />
      <DetailSecond data={data} card={card} />
      <DetailThree data={data} card={card} onRefresh={refetch} />
    </div>
  );
}
