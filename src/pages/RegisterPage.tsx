import React from "react";
import RegisterForm from "../components/RegisterForm";
import registerPic from "../images/noriel.png";

const RegisterPage = () => {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-20 lg:h-screen bg-emerald-300 relative hidden lg:block">
        <img src={registerPic} alt="Loading" />
      </div>
      <div className="w-full lg:w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
