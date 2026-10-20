import { IoAlertCircleOutline, IoRefresh } from "react-icons/io5";
import "./StatusComponent.css";

function ErrorComponent({
  title = "Gagal memuat data",
  message = "Terjadi masalah saat mengambil data. Periksa koneksi internetmu lalu coba lagi.",
  onRetry,
}) {
  return (
    <div className="status-wrapper" role="alert">
      <div className="status-icon status-icon--error">
        <IoAlertCircleOutline size={32} />
      </div>
      <h3 className="status-title">{title}</h3>
      <p className="status-message">{message}</p>
      {onRetry && (
        <button className="status-btn" onClick={onRetry}>
          <IoRefresh size={16} />
          Coba lagi
        </button>
      )}
    </div>
  );
}

export default ErrorComponent;