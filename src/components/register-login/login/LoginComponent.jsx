import React from "react";
import Brand from "../components/Brand.jsx";
import Field from "../components/Field.jsx";
import Footer from "../components/Footer.jsx";
import "./style.css";

function LoginComponent({ onRegister, onForgot }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [message, setMessage] = React.useState("");
  function submit(e) {
    e.preventDefault();
    setMessage(
      "Form login berhasil divalidasi. Hubungkan ke API untuk autentikasi sebenarnya.",
    );
  }
  return (
    <main className="page-hell">
      <section className="auth-card">
        <Brand />
        <form onSubmit={submit}>
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
            placeholder="Masukkan password"
            autoComplete="current-password"
          />
          <div className="form-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
            <button type="button" className="text-button" onClick={onForgot}>
              Lupa password?
            </button>
          </div>
          <button className="primary-button" type="submit">
            Masuk
          </button>
          {message && (
            <p className="feedback" role="status">
              {message}
            </p>
          )}
        </form>
        <p className="switch-copy">
          Belum punya akun?{" "}
          <button className="text-button" onClick={onRegister}>
            Daftar sekarang
          </button>
        </p>
        <Footer />
      </section>
    </main>
  );
}

export default LoginComponent;
