import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./ConfirmDialog.css";

function ConfirmDialog({
  open,
  title = "Konfirmasi",
  message = "Apakah kamu yakin?",
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  // Tutup dengan tombol Escape, fokus awal ke tombol Batal (pilihan paling aman)
  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  // Portal ke <body> supaya tidak terpengaruh transform/overflow milik sidebar
  return createPortal(
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className="confirm-box"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title" className="confirm-title">
          {title}
        </h3>
        <p id="confirm-message" className="confirm-message">
          {message}
        </p>
        <div className="confirm-actions">
          <button
            ref={cancelRef}
            type="button"
            className="confirm-btn confirm-btn--cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="confirm-btn confirm-btn--danger"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;
