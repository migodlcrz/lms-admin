import React from "react";
import LoginForm from "../components/LoginForm";
import loginPic from "../images/dmitri.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-20 lg:h-screen bg-emerald-300 relative  hidden lg:block">
        <img src={loginPic} alt="Loading" />
      </div>
      <div className="w-full lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
