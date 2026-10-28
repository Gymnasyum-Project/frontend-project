import "./HeaderComponent.css";
import useLogout from "../../../hooks/useLogout";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useState, useEffect, useRef } from "react";

function HeaderComponent({ title, subTitle, userInitials = "AD" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef(null);
  const logout = useLogout();

  // Tutup dropdown saat klik di luar atau tekan Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <div>
          <p className="header_title">{title}</p>
          <p className="header_subtitle">{subTitle}</p>
        </div>

        <div className="header_menu" ref={menuRef}>
          <button
            type="button"
            className="header_profile"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            {userInitials}
          </button>

          {menuOpen && (
            <div className="header_dropdown" role="menu">
              <button
                type="button"
                role="menuitem"
                className="header_dropdown_item"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <ConfirmDialog
        open={confirmOpen}
        title="Keluar dari akun?"
        message="Kamu perlu masuk lagi untuk mengakses dashboard."
        confirmText="Ya, keluar"
        cancelText="Batal"
        onConfirm={logout}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default HeaderComponent;
