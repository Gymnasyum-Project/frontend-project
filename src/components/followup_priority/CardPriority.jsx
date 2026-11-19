import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { COLORS, labelStyle } from "../../styles/color";
import formatDate from "../common/formatDate";
import getInitial from "../common/getInitial";
import useGetDraft from "../../hooks/priorityFollowUp/useGetDraft";
import { useSendWhatsapp } from "../../hooks/priorityFollowUp/useSendWhatsapp";

export default function CardPriority({ data, onDetail }) {
  const { loading, error, fetchDraft } = useGetDraft();
  const { send, sending, info, clearInfo } = useSendWhatsapp();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [summaryId, setSummaryId] = useState(null);
  const label = data.label ?? null;
  const labelText = label ?? "Belum dianalisis";

  const handleSendFollowUp = async () => {
    clearInfo();
    const result = await fetchDraft(data.id);
    setText(result?.edited_draft || result?.followup_draft || "");
    setSummaryId(result?.id ?? null);
    setOpen(true);
  };

  // 2. Fungsi kirim menggunakan hook useSendWhatsapp
  const handleKirimWa = async () => {
    await send({
      customerId: data.id,
      phone: data.phone,
      message: text,
      summaryId,
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    clearInfo();
  };
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
            {data.full_name}
          </p>
          <p className="font-gray">{data.segment}</p>
          <p className="card-label label" style={labelStyle(label)}>
            <FaCircle size={9} />
            {labelText}
          </p>
        </div>
        <div className="data-cust-mid">
          <p>
            <span className="font-gray">Skor: </span>
            {data.priority_score}%
          </p>
          <p className="hide-tablet active-mobile">
            <span className="font-gray">Terakhir hadir: </span>
            {formatDate(data.last_visit)}
          </p>
          <p>
            <span className="font-gray">Sisa paket: </span>
            {data.remaining_sessions}
          </p>
          <p className="hide-mobile">
            <span className="font-gray">No. Hp: </span>
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
          <FaGraduationCap /> {loading ? "Memuat..." : "Follow-Up"}
        </button>
      </div>
      {open && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Follow-up untuk {data.full_name}</h3>
            {error && <p style={{ color: COLORS.red[100] }}>{error}</p>}

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Draft belum tersedia, tulis pesan manual"
            />

            {/* 3. Tampilkan feedback status dari hook */}
            {info && (
              <p style={{ color: info.type === "ok" ? "green" : "red" }}>
                {info.text}
              </p>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="btn"
                style={{ border: "1px solid #14b8a6" }}
                type="button"
                onClick={handleCloseModal}
              >
                Batal
              </button>

              {/* 4. Ganti <a> menjadi <button> */}
              <button
                type="button"
                className="btn"
                onClick={handleKirimWa}
                disabled={!data.phone || !text.trim() || sending}
                style={{
                  border: "none",
                  backgroundColor: COLORS.green[350],
                  color: COLORS.gray[50],
                }}
              >
                {sending ? "Mencatat..." : "Kirim via WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
