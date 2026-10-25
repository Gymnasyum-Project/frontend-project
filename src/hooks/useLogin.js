import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/authService";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const submit = async (form, remember = true) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await login(form);

      const storage = remember ? localStorage : sessionStorage;
      const other = remember ? sessionStorage : localStorage;
      other.removeItem("token"); // buang sisa login sebelumnya di storage lain
      other.removeItem("user");

      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
