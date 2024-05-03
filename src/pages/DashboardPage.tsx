import React from "react";
import { useLogout } from "../hooks/useLogout";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const { logout } = useLogout();
  return (
    <div>
      <div></div>
    </div>
  );
};

export default DashboardPage;
