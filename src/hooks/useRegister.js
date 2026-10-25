import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (form) => {
    setLoading(true);
    setError(null);
    try {
      await register(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email sudah terdaftar");
      } else {
        setError(err.response?.data?.message || "Pendaftaran gagal, Coba lagi");
      }
    } finally {
      setLoading(false);
    }
  };
  return { submit, loading, error };
}
