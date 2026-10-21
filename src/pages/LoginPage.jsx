import React from "react";
import LoginComponent from "../components/register-login/login/LoginComponent";

function LoginPage() {
  const [page, setPage] = React.useState("login");

  return (
    <>
      {page === "login" && (
        <LoginComponent
          onRegister={() => setPage("register")}
          onForgot={() => setPage("forgot")}
        />
      )}
    </>
  );
}

export default LoginPage;
