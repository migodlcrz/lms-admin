import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (logForm: LoginForm) => {
    // setIsLoading(true);
    // setError(null);

    console.log(JSON.stringify(logForm));

    const response = await fetch("http://localhost:4000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logForm),
    });

    const json = await response.json();

    // setIsLoading(false);

    if (!response.ok) {
      console.log("RESPONSE NOT OK: ", json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      // localStorage.setItem("token", JSON.stringify(json.token));
      console.log("RESPONSE OK: ", json.message);
      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");

      //   setIsLoading(false);
    }
  };

  return { login };
};
