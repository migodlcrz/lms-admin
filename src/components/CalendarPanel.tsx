import React from "react";
import CustomCalendar from "./Calendar";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";

const CalendarPanel = () => {
  const { user } = useAuthContext();
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          delay: 0.3,
          bounce: 0.4,
        },
      }}
      className="flex flex-row h-full w-1/4"
    >
      <div className="h-full w-full">
        {/* Profile */}
        <div className="flex flex-col space-y-3 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md shadow-md h-full w-full p-6 items-center">
          <div className="flex flex-row space-x-3 w-full border-b-[1px] rounded-sm border-gray-300 pb-4 h-1/6">
            <div className="avatar online w-1/4">
              <div className="w-24 h-24 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col w-3/4">
              <h3 className="font-semibold text-lg text-black">
                {user.user_.firstName} {user.user_.lastName}
              </h3>
              <h3 className="text-fuchsia-700 font-semibold">Novice</h3>

              <h3 className="text-black font-semibold mt-2">
                <span className="bg-gray-400 p-1 px-2 rounded-xl text-white shadow-md">
                  Total Points: 200
                </span>
              </h3>
            </div>
          </div>
          <div className="h-full w-full">
            <CustomCalendar />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarPanel;
