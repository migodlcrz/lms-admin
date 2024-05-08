import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId="819211033215-f9gre3602f2n1gfi77nc017une0u2c9e.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
