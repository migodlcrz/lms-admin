"use client";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../hooks/useLogin";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

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
  const { login, googleLogin } = useLogin();

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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const json = await res.json();

        console.log(json);
        googleLogin(json.name, json.email);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-24 bg-slate-50">
      {/* <div className="grid place-items-center h-screen bg-fuchsia-50"> */}
      {/* <div className="bg-white shadow-xl p-5 min-w-[60%] border-t-4 border-fuchsia"> */}
      <div className="flex flex-row ">
        <h1 className="text-xl font-bold my-4 text-center text-black">
          Administrator Login
        </h1>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 items-start w-full"
      >
        <input
          type="text"
          placeholder="Email"
          className="input-md w-full border-fuchsia border-2 rounded-xl shadow-xl bg-white"
          data-testid=""
          value={loginForm.email}
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
        />
        <input
          type={seePassword ? "text" : "password"}
          placeholder="Password"
          className="input-md w-full border-fuchsia border-2 rounded-xl shadow-xl bg-white"
          data-testid=""
          value={loginForm.password}
          onChange={(e) => {
            changeHandler("password", e.target.value);
          }}
        />
        <div className="text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-xs mr-2 border-[0.5px] border-fuchsia"
            onClick={() => {
              setSeePassword(!seePassword);
            }}
          />{" "}
          Show Password
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          className="w-full"
        >
          <button
            onClick={() => {
              setLoading(true);
            }}
            className="btn bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 rounded-xl text-white font-bold cursor-pointer py-2 hover:bg-fuchsia-300 hover:text-slate-200 w-full shadow-md"
            data-testid=""
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-black font-bold ">Login</span>
            )}
          </button>
        </motion.div>
      </form>
      <div className="flex justify-center items-center w-full gap-3">
        <div className="border-b-2 border-fuchsia-800 py-2 w-full px-6"></div>
        <div className="mt-3 text-fuchsia-800">or</div>
        <div className="border-b-2 border-fuchsia-800 py-2 w-full px-6"></div>
      </div>
      <div className="w-full mt-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          className="w-full"
        >
          <button
            onClick={() => handleGoogleLogin()}
            className="flex flex-row items-center justify-center space-x-4 border-[0.5px] border-black w-full p-2 hover:bg-gray-500 transition duration-300 rounded-xl"
          >
            <FcGoogle className="text-4xl" />
            <span className="font-bold text-black">Sign in with Google</span>
          </button>
        </motion.div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default LoginForm;
