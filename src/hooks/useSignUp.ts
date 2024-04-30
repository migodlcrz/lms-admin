import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

interface RegForm {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (regForm: RegForm) => {
    // setIsLoading(true);
    // setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regForm),
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

      //   setIsLoading(false);
    }
  };

  return { signup };
};
