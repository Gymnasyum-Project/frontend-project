import { FiArrowLeft } from "react-icons/fi";
export default function BackButton({ onClick }) {
  return (
    <button className="back-button" type="button" onClick={onClick}>
      <FiArrowLeft size={17} /> Kembali ke login
    </button>
  );
}
