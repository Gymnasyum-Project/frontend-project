import React from "react";
import { CheckCircle2 } from "lucide-react";
import Brand from "../components/Brand.jsx";
import Field from "../components/Field.jsx";
import Footer from "../components/Footer.jsx";
import BackButton from "../components/BackButton.jsx";
import "./style.css";

function RegisterComponent({ onLogin }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [agree, setAgree] = React.useState(true);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  function submit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 8)
      return setError("Password harus terdiri dari minimal 8 karakter.");
    if (password !== confirm)
      return setError("Konfirmasi password tidak sama.");
    if (!agree)
      return setError("Kamu perlu menyetujui ketentuan untuk melanjutkan.");
    setMessage("Data pendaftaran valid. Hubungkan ke API untuk membuat akun.");
  }

  return (
    <main className="page-hell">
      <section className="auth-card register-card">
        <BackButton onClick={onLogin} />
        <Brand />
        <div className="register-heading">
          <h2>Buat akun baru</h2>
          <p>Mulai kelola engagement member gym kamu.</p>
        </div>
        <form onSubmit={submit}>
          <Field
            label="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            autoComplete="name"
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            autoComplete="email"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
          />
          <Field
            label="Konfirmasi password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password"
            autoComplete="new-password"
          />
          <label className="remember terms">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>Saya menyetujui ketentuan penggunaan.</span>
          </label>
          {error && (
            <p className="feedback error" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="feedback success" role="status">
              <CheckCircle2 size={17} /> {message}
            </p>
          )}
          <button className="primary-button" type="submit">
            Daftar
          </button>
        </form>
        <p className="switch-copy">
          Sudah punya akun?{" "}
          <button className="text-button" onClick={onLogin}>
            Masuk
          </button>
        </p>
        <Footer />
      </section>
    </main>
  );
}

export default RegisterComponent;
