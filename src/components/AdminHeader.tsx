import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

interface TitleMap {
  [key: string]: string;
}

const titleMap: TitleMap = {
  "/courses": "Courses",
  "/students": "Students",
  "/dashboard": "Dashboard",
};

const AdminHeader = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [title, setTitle] = useState("Title");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setTitle(titleMap[currentPath] || "Title");
  }, [location.pathname]);

  return (
    <div className="navbar w-full p-10 h-20 bg-white shadow-lg fixed top-0 z-50 pr-[300px]">
      <h1 className="flex-1 font-bold text-black text-3xl">{title}</h1>
      <div className="flex-none space-x-2">
        <ul className="flex justify-center items-center menu menu-horizontal px-1 space-x-1">
          <li className="text-black">{user.name}</li>
        </ul>
        <details className="dropdown dropdown-end">
          <summary className="m-1 btn rounded-full p-0 bg-white shadow-none border-white hover:bg-white hover:border-white">
            <div className="avatar ">
              <div className="w-9 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="none"
                />
              </div>
            </div>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 w-52 rounded-none">
            <li>
              <button
                onClick={() => {
                  logout();
                }}
                className="btn rounded-none bg-red-600 text-white font-bold hover:bg-red-700"
              >
                Log out
              </button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default AdminHeader;
