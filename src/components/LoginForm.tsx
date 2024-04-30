"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLogin } from "../hooks/useLogin";

interface LogForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState<LogForm>({
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const { login } = useLogin();

  const navigate = useNavigate();

  const clearForm = () => {
    setLoginForm({
      email: "",
      password: "",
    });
  };

  const changeHandler = (field: string, value: string) => {
    setLoginForm({ ...loginForm, [field]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(loginForm);
      clearForm();
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="grid place-items-center h-screen bg-cream">
        <div className="bg-white shadow-lg p-5 min-w-[60%] border-t-4 border-harvest_gold">
          <div className="flex flex-row ">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-4xl text-harvest_gold hover:text-cerulean-300
          "
            >
              <MdKeyboardArrowLeft />
            </button>
            <h1 className="text-xl font-bold my-4 text-center text-black">
              Login
            </h1>
          </div>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              className="input-md"
              data-testid=""
              value={loginForm.email}
              onChange={(e) => {
                changeHandler("email", e.target.value);
              }}
            />
            <input
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              className="input-md"
              data-testid=""
              value={loginForm.password}
              onChange={(e) => {
                changeHandler("password", e.target.value);
              }}
            />
            <div className="text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-xs mr-2"
                onClick={() => {
                  setSeePassword(!seePassword);
                }}
              />{" "}
              Show Password
            </div>
            <button
              onClick={() => {
                setLoading(true);
              }}
              className="btn bg-harvest_gold text-white font-bold cursor-pointer py-2 hover:bg-harvest_gold-300 hover:text-slate-200 w-full rounded-none"
              data-testid=""
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="text-black font-bold">Login</span>
              )}
            </button>
            <a className="text-sm mt-3 text-center" href={"/register"}>
              {"Don't have an account?"}{" "}
              <span className="text-cerulean hover:text-emerald-500">
                Register
              </span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
