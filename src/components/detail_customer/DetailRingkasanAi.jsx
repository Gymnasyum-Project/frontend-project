import { useMemo } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DetailRingkasanAi({ data }) {
  const formattedContent = useMemo(() => {
    if (!data || typeof data !== "string") return "";

    // Hilangkan kalimat pembuka "Berikut adalah analisis..." jika ada
    const withoutIntro = data.replace(
      /^Berikut adalah analisis[\s\S]*?(?=###\s*A\.)/i,
      "",
    );

    // Opsional: Sembunyikan bagian D & E karena sudah ada di form Draft WhatsApp terpisah
    // Hapus 4 baris di bawah ini jika bagian D & E tetap ingin tampil di kartu Ringkasan AI
    const beforeDraft = withoutIntro.split("### D.")[0] || "";
    const afterAlt = withoutIntro.includes("### F.")
      ? "\n\n### F." + withoutIntro.split("### F.")[1]
      : "";

    return (beforeDraft + afterAlt).trim();
  }, [data]);

  return (
    <div className="ai-summary-card">
      <p className="judul-ai">
        <FaGraduationCap /> Ringkasan AI
      </p>

      <div className="ai-markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {formattedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
