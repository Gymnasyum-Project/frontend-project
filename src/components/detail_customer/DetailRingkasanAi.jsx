import { FaGraduationCap } from "react-icons/fa6";
export default function DetailRingkasanAi({ data }) {
  return (
    <div className="ai-summary-card">
      <p className="judul-ai">
        <FaGraduationCap /> Ringkasan AI
      </p>
      <p>{data}</p>
    </div>
  );
}
