import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/auth/login/LoginComponent";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginComponent
        onRegister={() => navigate("/register")}
        onForgot={() => navigate("/forgot-password")}
      />
    </div>
  );
}

export default LoginPage;
