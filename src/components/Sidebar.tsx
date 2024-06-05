import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/learnify-white.png";
import { useLogout } from "../hooks/useLogout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Track whether sidebar is open or closed
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useLogout();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky flex top-0 h-screen z-50" data-testid="sidebar-page">
      <div
        onClick={() => !isOpen && toggleSidebar()}
        className={`flex items-start transition-all duration-300 bg-oslo_gray-950 z-50 ${
          isOpen ? "w-80" : "w-20"
        }`}
      >
        <div className="w-full">
          <div className="flex flex-row items-center space-x-4 p-4 w-full shadow-md bg-poly-bg-fuchsia h-20">
            <button
              className="text-white hover:text-black text-2xl z-50 mx-3 transition-colors duration-300"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <div>
              <p
                className={
                  "text-white font-bold text-3xl " + (isOpen ? "" : "hidden")
                }
              >
                Learnify
              </p>
            </div>
          </div>

          <ul className="flex flex-col p-3 space-y-6">
            <button
              // disabled={!isOpen}
              onClick={() => {
                if (isOpen) {
                  navigate("/dashboard");
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }}
              className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                currentPath === "/dashboard"
                  ? "text-white bg-gradient-to-r from-fuchsia-300 via-fuchsia-500 to-fuchsia-700 shadow-xl"
                  : isOpen &&
                    "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
              }`}
            >
              <li className="grid place-items-center py-2 h-12 text-4xl relative">
                <MdOutlineSpaceDashboard />
              </li>
              {isOpen && <p className="font-bold text-sm w-full">Overview</p>}
            </button>
            <button
              // disabled={!isOpen}
              onClick={() => {
                if (isOpen) {
                  navigate("/courses");
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }}
              className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                currentPath === "/courses"
                  ? "text-white bg-gradient-to-r from-fuchsia-300 via-fuchsia-500 to-fuchsia-700 shadow-xl"
                  : isOpen &&
                    "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
              }`}
              data-testid="courses-page"
            >
              <li className="grid place-items-center py-2 h-12 text-4xl relative">
                <MdOutlineLibraryBooks />
              </li>
              {isOpen && <p className="font-bold text-sm w-full">My Courses</p>}
            </button>
            <button
              // disabled={!isOpen}
              onClick={() => {
                if (isOpen) {
                  navigate("/students");
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }}
              className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                currentPath === "/settings"
                  ? "text-white bg-gradient-to-r from-fuchsia-300 via-fuchsia-500 to-fuchsia-700 shadow-xl"
                  : isOpen &&
                    "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
              }`}
              data-testid="students-page"
            >
              <li className="grid place-items-center py-2 h-12 text-4xl relative">
                <CgProfile />
              </li>
              {isOpen && (
                <p className="font-bold text-sm w-full">My Students</p>
              )}
            </button>
            <button
              onClick={() => {
                logout();
              }}
              className="btn"
              data-testid="logout-button"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
