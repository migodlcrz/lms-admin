import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const googleLogin = async (name: string, email: string) => {
    const response = await fetch(
      "http://localhost:4000/api/admin/login/google",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("admin", JSON.stringify(json));
      localStorage.setItem("admin-token", JSON.stringify(json.token));

      dispatch({ type: "LOGIN", payload: json });
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      navigate("/dashboard");
    }

    if (!response.ok) {
      toast.error(json.error);
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
      toast.error(json.error);
    }

    if (response.ok) {
      localStorage.setItem("admin", JSON.stringify(json));
      localStorage.setItem("admin-token", JSON.stringify(json.token));

      // localStorage.setItem("token", JSON.stringify(json.token));
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");

      //   setIsLoading(false);
    }
  };

  return { googleLogin, login };
};
