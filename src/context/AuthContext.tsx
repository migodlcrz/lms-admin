import { jwtDecode } from "jwt-decode";
import React, {
  FC,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  user: any;
  isLoading: boolean;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  user: any;
  isLoading: boolean;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const user: string | null = JSON.parse(
      localStorage.getItem("admin") || "null"
    );

    const token: string | null = JSON.parse(
      localStorage.getItem("admin-token") || "null"
    );

    if (!user || !token) {
      dispatch({ type: "LOGOUT" });
    }

    try {
      const decodedToken: any = jwtDecode(token!);

      // checkToken();
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        console.log("PAYLOAD: ", user);
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  console.log("Auth Context State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.isLoading ? (
        <div className="grid w-full h-screen place-items-center">
          <p className="text-black font-bold text-2xl">Loading...</p>
        </div> //
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
