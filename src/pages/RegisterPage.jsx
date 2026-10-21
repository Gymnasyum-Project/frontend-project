import React from "react";
import RegisterComponent from "../components/register-login/register/RegisterComponent";

function RegisterPage() {
  const [page, setPage] = React.useState("login");
  return (
    <>
      {page === "register" && (
        <RegisterComponent onLogin={() => setPage("login")} />
      )}
    </>
  );
}

export default RegisterPage;
