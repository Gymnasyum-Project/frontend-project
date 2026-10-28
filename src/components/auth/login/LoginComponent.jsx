import React from "react";
import Brand from "../components/Brand.jsx";
import Field from "../components/Field.jsx";
import Footer from "../components/Footer.jsx";
import useLogin from "../../../hooks/useLogin.js";
import { FiCheckCircle } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import "../auth.css";

function LoginComponent({ onRegister, onForgot }) {
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const { submit, error, loading } = useLogin();
  const [justRegistered] = React.useState(
    () => location.state?.registered === true,
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.registered) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    submit({ email, password }, remember);
  }
  return (
    <main className="page-shell">
      <section className="auth-card">
        <Brand />
        {justRegistered && (
          <p className="feedback success" role="status">
            <FiCheckCircle size={17} /> Registrasi berhasil, silakan login.
          </p>
        )}
        <form onSubmit={handleSubmit}>
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
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Memproses" : "Masuk"}
          </button>
          {error && (
            <p className="feedback feedback--error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="switch-copy">
          Belum punya akun?{" "}
          <button type="button" className="text-button" onClick={onRegister}>
            Daftar sekarang
          </button>
        </p>
        <Footer />
      </section>
    </main>
  );
}

export default LoginComponent;
