import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  const { user } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div
      className={`flex h-screen items-end transition-all duration-300 ${
        isHovered ? "w-[280px]" : "w-[80px]"
      } bg-cerulean shadow-xl shadow-black overflow-hidden fixed top-0 z-50 h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="">
        <ul className="flex flex-col ">
          <div
            onClick={() => {
              navigate("/courses");
            }}
            className="flex flex-row items-center space-x-4 p-5  w-screen hover:bg-cerulean-300"
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <MdOutlineLibraryBooks />
            </li>
            <p
              className={`text-white font-bold text-sm w-full ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Courses
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/students");
            }}
            className="flex flex-row items-center space-x-4 p-5 w-screen hover:bg-cerulean-300"
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <PiStudentBold />
            </li>
            <p
              className={`text-white font-bold text-sm w-full ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Students
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="flex flex-row items-center space-x-4 p-5 w-screen hover:bg-cerulean-300"
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <MdOutlineSpaceDashboard />
            </li>
            <p
              className={`text-white font-bold text-sm w-full ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Dashboard
            </p>
          </div>
          <div className=" flex flex-row items-center space-x-4 p-5 hover:bg-cerulean-300 w-screen shadow-black shadow-md">
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <CgProfile />
            </li>
            <p
              className={`flex flex-col text-white font-bold text-sm ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {user && user.user_}
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-white text-black hover:bg-gray-200"
              >
                Logout
              </button>
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
