import React from "react";
import { useLogout } from "../hooks/useLogout";

const DashboardPage = () => {
  const { logout } = useLogout();
  return (
    <div>
      <label htmlFor="">DashboardPage</label>
    </div>
  );
};

export default DashboardPage;
