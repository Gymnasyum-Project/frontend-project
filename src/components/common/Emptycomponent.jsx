import { IoFileTrayOutline } from "react-icons/io5";
import "./StatusComponent.css";

function EmptyComponent({
  title = "Belum ada data",
  message = "Data dashboard belum tersedia saat ini.",
}) {
  return (
    <div className="status-wrapper">
      <div className="status-icon status-icon--empty">
        <IoFileTrayOutline size={32} />
      </div>
      <h3 className="status-title">{title}</h3>
      <p className="status-message">{message}</p>
    </div>
  );
}

export default EmptyComponent;