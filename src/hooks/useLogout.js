import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

export default function useLogout() {
  const navigate = useNavigate();

  return () => {
    clearAuth();
    navigate("/login", { replace: true });
  };
}
