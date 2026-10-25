import React from "react";
import Brand from "../components/Brand.jsx";
import Field from "../components/Field.jsx";
import Footer from "../components/Footer.jsx";
import BackButton from "../components/BackButton.jsx";
import "../auth.css";
import useRegister from "../../../hooks/useRegister.js";

function RegisterComponent({ onLogin }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [localError, setLocalError] = React.useState("");
  const { submit, loading, error } = useRegister();

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    if (!name.trim()) return setLocalError("Nama lengkap wajib diisi.");
    if (password.length < 8)
      return setLocalError("Password harus terdiri dari minimal 8 karakter.");
    if (password !== confirm)
      return setLocalError("Konfirmasi password tidak sama.");
    if (!agree)
      return setLocalError("Kamu harus menyetujui ketentuan penggunaan.");

    const phoneRegex = /^(\+62|62|0)8[0-9]{8,12}$/;
    if (phone && !phoneRegex.test(phone.trim()))
      return setLocalError("Nomor telepon Indonesia tidak valid.");
    submit({
      name: name.trim(),
      email: email.trim(),
      password,
      no_tlp: phone.trim() || null,
    });
  }

  // Satu tempat untuk semua pesan error (validasi lokal atau dari backend)
  const errorMessage = localError || error;

  return (
    <main className="page-shell">
      <section className="auth-card register-card">
        <BackButton onClick={onLogin} />
        <Brand />
        <div className="register-heading">
          <h2>Buat akun baru</h2>
          <p>Mulai kelola engagement member gym kamu.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Field
            label="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            autoComplete="name"
            required
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            autoComplete="email"
            required
          />
          <Field
            label="Nomor telepon (opsional)"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            autoComplete="tel"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
            required
          />
          <Field
            label="Konfirmasi password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password"
            autoComplete="new-password"
            required
          />
          <label className="remember terms">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>Saya menyetujui ketentuan penggunaan.</span>
          </label>

          {errorMessage && (
            <p className="feedback error" role="alert">
              {errorMessage}
            </p>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="switch-copy">
          Sudah punya akun?{" "}
          <button type="button" className="text-button" onClick={onLogin}>
            Masuk
          </button>
        </p>
        <Footer />
      </section>
    </main>
  );
}

export default RegisterComponent;
