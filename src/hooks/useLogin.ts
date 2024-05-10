import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const googleLogin = async (name: string, email: string, token: string) => {
    const bodyData = {
      name: name,
      email: email,
      token: token,
    };

    const response = await fetch(
      "http://localhost:4000/api/admin/login/google",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("admin", JSON.stringify(json));
      localStorage.setItem("admin-token", JSON.stringify(json.token));

      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");
    }

    if (!response.ok) {
      console.log(json);
    }
  };

  const login = async (logForm: LoginForm) => {
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
      localStorage.setItem("admin", JSON.stringify(json));
      localStorage.setItem("admin-token", JSON.stringify(json.token));

      // localStorage.setItem("token", JSON.stringify(json.token));
      console.log("RESPONSE OK: ", json.message);
      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");

      //   setIsLoading(false);
    }
  };

  return { googleLogin, login };
};
