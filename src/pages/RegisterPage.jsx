import { useNavigate } from "react-router-dom";
import RegisterComponent from "../components/auth/registrasi/RegisterComponent";

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RegisterComponent onLogin={() => navigate("/login")} />
    </div>
  );
}

export default RegisterPage;
