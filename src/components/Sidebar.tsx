import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks, MdOutlineShoppingCart } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/learnify-white.png";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaBookmark, FaHome } from "react-icons/fa";
import { FaDollarSign, FaPerson } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Track whether sidebar is open or closed
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("PATH: ", currentPath);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky flex top-0 h-screen z-50">
      <div
        onClick={() => toggleSidebar()}
        className={`flex items-start transition-all h-full duration-300 bg-raisin_black-300 border-r-[0.1px] border-raisin_black-600 z-50 cursor-pointer ${
          isOpen ? "w-80" : "w-20"
        }`}
      >
        <div className="w-full h-full">
          <div className="flex flex-row items-center space-x-4 p-4 w-fullh-[8%]">
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
          <div className="flex flex-col justify-between h-[92%]">
            <ul className="flex flex-col space-y-6">
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
                className={`flex flex-row items-center justify-center space-x-4 w-full text-white transition-colors duration-300 ${
                  currentPath === "/dashboard"
                    ? "text-[#be6ab7] border-r-2 border-[#be6ab7]"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-300 hover:to-fuchsia-500"
                }`}
              >
                <li
                  className={`grid place-items-center py-2 h-12 text-2xl relative ${
                    currentPath === "/dashboard" && "text-[#be6ab7]"
                  }`}
                >
                  {!isOpen && <FaHome />}
                </li>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-sm w-full"
                  >
                    Overview
                  </motion.p>
                )}
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
                className={`flex flex-row items-center justify-center space-x-4 w-full text-white transition-colors duration-300 ${
                  currentPath === "/courses"
                    ? "text-[#be6ab7] border-r-2 border-[#be6ab7]"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
                }`}
                data-testid="on-going-courses"
              >
                <li
                  className={`grid place-items-center py-2 h-12 text-xl relative ${
                    currentPath === "/courses" && "text-[#be6ab7]"
                  }`}
                >
                  {!isOpen && <FaBookmark />}
                </li>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-sm w-full"
                  >
                    My Courses
                  </motion.p>
                )}
              </button>
              <button
                onClick={() => {
                  if (isOpen) {
                    navigate("/students");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center justify-center space-x-4 w-full text-white transition-colors duration-300 ${
                  currentPath === "/students"
                    ? "text-[#be6ab7] border-r-2 border-[#be6ab7]"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
                }`}
                data-testid="subscription-plan"
              >
                <li
                  className={`grid place-items-center py-2 h-12 text-2xl relative ${
                    currentPath === "/students" && "text-[#be6ab7]"
                  }`}
                >
                  {!isOpen && <FaPerson />}
                </li>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-sm w-full"
                  >
                    Students
                  </motion.p>
                )}
              </button>
              <button
                onClick={() => {
                  if (isOpen) {
                    navigate("/pricing");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center justify-center space-x-4 w-full text-white transition-colors duration-300 ${
                  currentPath === "/pricing"
                    ? "text-[#be6ab7] border-r-2 border-[#be6ab7]"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-100 hover:via-fuchsia-300 hover:to-fuchsia-500"
                }`}
                data-testid="subscription-plan"
              >
                <li
                  className={`grid place-items-center py-2 h-12 text-2xl relative ${
                    currentPath === "/pricing" && "text-[#be6ab7]"
                  }`}
                >
                  {!isOpen && <FaDollarSign />}
                </li>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-sm w-full"
                  >
                    Pricing
                  </motion.p>
                )}
              </button>
            </ul>
            <ul className="flex flex-col space-y-6">
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/settings");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center justify-center space-x-4 w-full text-white transition-colors duration-300 ${
                  currentPath === "/settings"
                    ? "text-[#be6ab7] border-r-2 border-[#be6ab7]"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-300 hover:to-fuchsia-500"
                }`}
              >
                <li
                  className={`grid place-items-center py-2 h-12 text-2xl relative ${
                    currentPath === "/settings" && "text-[#be6ab7]"
                  }`}
                >
                  {!isOpen && <CgProfile />}
                </li>
                {isOpen && <p className="font-bold text-sm w-full">Profile</p>}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
