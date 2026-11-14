import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { COLORS } from "../../styles/color";
import formatDate from "../common/formatDate";
import getInitial from "../common/getInitial";
import useGetDraft from "../../hooks/priorityFollowUp/useGetDraft";

export default function CardPriority({ data, onDetail }) {
  const { loading, error, fetchDraft } = useGetDraft();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleSendFollowUp = async () => {
    const result = await fetchDraft(data.id);
    setText(result?.followup_draft ?? "");
    setOpen(true);
  };

  const waNumber = (data.phone ?? "").replace(/\D/g, "").replace(/^0/, "62");
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  return (
    <div className="card card-container">
      <div
        className="initial-name"
        style={{
          backgroundColor:
            data.label === "At Risk" ? COLORS.red[50] : COLORS.yellow[50],
          color:
            data.label === "At Risk" ? COLORS.red[100] : COLORS.yellow[150],
        }}
      >
        {getInitial(data.full_name)}
      </div>
      <div className="data-cust">
        <div className="data-cust-mid">
          {" "}
          <p style={{ display: "flex", alignItems: "center" }}>
            <strong>{data.full_name}</strong>
          </p>
          <p
            className="card-label "
            style={{
              backgroundColor: COLORS.gray[200],
            }}
          >
            {data.segment}
          </p>
          <p
            className="card-label label"
            style={{
              backgroundColor:
                data.label === "At Risk" ? COLORS.red[50] : COLORS.yellow[50],
              color:
                data.label === "At Risk" ? COLORS.red[100] : COLORS.yellow[150],
            }}
          >
            <FaCircle size={9} />
            {data.label}
          </p>
        </div>
        <div className="data-cust-mid">
          <p>
            <span style={{ color: COLORS.gray[400], fontSize: "0.8rem" }}>
              Skor:{" "}
            </span>
            {data.priority_score}%
          </p>
          <p className="hide-tablet active-mobile">
            <span style={{ color: COLORS.gray[400], fontSize: "0.8rem" }}>
              Terakhir hadir:{" "}
            </span>
            {formatDate(data.last_visit)}
          </p>
          <p>
            <span style={{ color: COLORS.gray[400], fontSize: "0.8rem" }}>
              Sisa Paket:{" "}
            </span>
            {data.remaining_sessions}
          </p>
          <p className="hide-mobile">
            <span style={{ color: COLORS.gray[400], fontSize: "0.8rem" }}>
              No. Hp:{" "}
            </span>
            {data.phone}
          </p>
        </div>
      </div>
      <div className="data-cust-mid">
        <button
          type="button"
          onClick={() => onDetail?.(data)}
          className="btn"
          style={{ border: "1px solid #14b8a6" }}
        >
          Lihat Detail
        </button>
        <button
          className="btn hide-mobile"
          type="button"
          disabled={loading}
          onClick={handleSendFollowUp}
          style={{
            border: "none",
            backgroundColor: COLORS.green[350],
            color: COLORS.gray[50],
          }}
        >
          <FaGraduationCap /> {loading ? "Memuat..." : "Follow-up"}
        </button>
      </div>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Follow-up untuk {data.full_name}</h3>
            {error && <p style={{ color: COLORS.red[100] }}>{error}</p>}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Draft belum tersedia, tulis pesan manual"
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="btn"
                style={{ border: "1px solid #14b8a6" }}
                type="button"
                onClick={() => setOpen(false)}
              >
                Batal
              </button>
              <a
                style={{
                  border: "none",
                  backgroundColor: COLORS.green[350],
                  color: COLORS.gray[50],
                }}
                className="btn"
                href={waLink}
                target="_blank"
                rel="noreferrer"
              >
                Kirim via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
