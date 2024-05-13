import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import logo from "../images/learnify.png";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if a path matches the current location
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`flex h-screen items-start transition-all duration-300 w-[250px] bg-cerulean shadow-xl overflow-hidden fixed`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="">
        <ul className="flex flex-col ">
          <div className="flex flex-row items-center p-4">
            <img src={logo} alt="Loading" width="50" height="50" />
            <h2 className="font-bold text-white text-3xl">Learnify</h2>
          </div>
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className={`flex flex-row items-center space-x-4 p-4 w-screen m-2 ${
              isActive("/dashboard")
                ? "bg-cerulean-300"
                : "hover:bg-cerulean-300"
            }`}
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <MdOutlineSpaceDashboard />
            </li>
            <p className={`text-white font-bold text-sm w-full`}>Dashboard</p>
          </div>
          <div
            onClick={() => {
              navigate("/courses");
            }}
            className={`flex flex-row items-center space-x-4 p-4 w-screen m-2 ${
              isActive("/courses") ? "bg-cerulean-300" : "hover:bg-cerulean-300"
            }`}
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <MdOutlineLibraryBooks />
            </li>
            <p className={`text-white font-bold text-sm w-full`}>Courses</p>
          </div>
          <div
            onClick={() => {
              navigate("/students");
            }}
            className={`flex flex-row items-center space-x-4 p-4 w-screen m-2 ${
              isActive("/students")
                ? "bg-cerulean-300"
                : "hover:bg-cerulean-300"
            }`}
          >
            <li className="grid place-items-center py-2 text-white h-12 text-4xl relative">
              <PiStudentBold />
            </li>
            <p className={`text-white font-bold text-sm w-full `}>Students</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
