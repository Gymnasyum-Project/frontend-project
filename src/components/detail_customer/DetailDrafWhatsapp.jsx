import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { generateSummary, updateSummary } from "../../services/customerService";

const draftOf = (s) => s?.edited_draft || s?.followup_draft || "";

export default function DetailDrafWhatsapp({ data }) {
  const [summary, setSummary] = useState(data.ai_summary);
  const [pesan, setPesan] = useState(draftOf(data.ai_summary));
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSummary(data.ai_summary);
    setPesan(draftOf(data.ai_summary));
    setError(null);
  }, [data.id]);

  const generateUlang = async () => {
    if (generating) return;
    if (
      pesan !== draftOf(summary) &&
      !window.confirm("Perubahan pada draft akan hilang. Lanjutkan?")
    )
      return;

    setGenerating(true);
    setError(null);
    try {
      const result = await generateSummary(data.id, { regenerate: true });
      console.log("HASIL GENERATE:", result);

      setSummary(result);
      setPesan(draftOf(result));
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const salinPesan = async () => {
    if (!pesan.trim()) return;
    try {
      await navigator.clipboard.writeText(pesan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Gagal menyalin pesan");
    }
  };

  const kirim = () => {
    let nomor = (data.phone ?? "").replace(/\D/g, "");
    if (!nomor || !pesan.trim()) return;

    if (nomor.startsWith("0")) {
      nomor = "62" + nomor.slice(1);
    }
    window.open(
      `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
      "_blank",
    );
    if (summary?.id) {
      updateSummary(summary.id, { edited_draft: pesan, status: "approved" })
        .then(setSummary)
        .catch(() =>
          setError("Pesan terbuka, tapi gagal menyimpan perubahan draft"),
        );
    }
  };
  console.log(pesan);
  return (
    <div className="ai-summary-card">
      <p className="judul-ai">
        <FaGraduationCap /> Draft Follow-up WhatsApp
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <textarea
          className="wa-textarea"
          name="pesan"
          rows="5"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <button
          type="button"
          className="btn-generate-pesan"
          onClick={generateUlang}
          disabled={generating}
        >
          {generating
            ? "Memproses..."
            : summary
              ? "Generate Ulang"
              : "Generate Draft"}
        </button>
        <button
          type="button"
          className="btn-generate-pesan"
          onClick={salinPesan}
          disabled={!pesan.trim()}
        >
          {copied ? "Tersalin" : "Salin Pesan"}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
      <button
        className="btn-kirim-pesan"
        onClick={kirim}
        disabled={!data.phone}
      >
        Follow up via whatsapp
      </button>
    </div>
  );
}
