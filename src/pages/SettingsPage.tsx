import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const SettingsPage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 pl-[120px] p-10 bg-white h-screen">
      <div className="grid h-full w-full place-items-center bg-cream p-4">
        <div>Name: {user.user_}</div>
        <div>Email: {user.email}</div>
        <button
          onClick={() => {
            logout();
          }}
          className="btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
