import { ArrowLeft } from "lucide-react";
export default function BackButton({ onClick }) {
  return (
    <button className="back-button" type="button" onClick={onClick}>
      <ArrowLeft size={17} /> Kembali ke login
    </button>
  );
}
