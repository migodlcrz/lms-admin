import { motion } from "framer-motion";
import React from "react";
import Guy from "../images/guy.png";

interface CourseProps {
  courseID: string;
  courseName: string;
  publisher: string;
  tier: string;
  description: string;
  isPublished: boolean;
}

const CourseCard: React.FC<CourseProps> = ({
  courseID,
  courseName,
  publisher,
  tier,
  description,
  isPublished,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className="w-full"
    >
      <div
        className="p-3"
        style={{ transition: "opacity 0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <div
          className={`w-80 h-80 shadow-xl rounded-3xl p-2 ${
            isPublished ? "bg-fuchsia-700" : "bg-white"
          }`}
        >
          <div
            className="w-full h-full rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 20%, transparent 50%), url(${Guy})`,
            }}
          >
            <div className="flex flex-col p-3 h-full w-full justify-between">
              <h2 className="flex flex-row justify-center items-center">
                <p
                  className="text-white font-bold w-full truncate tooltip text-start"
                  data-tip={courseName}
                >
                  {courseName}
                </p>
              </h2>
              <div className="card-actions justify-end">
                <div
                  className={`badge font-semibold
              ${tier === "Free" && "bg-black text-white"} 
              ${
                tier === "Basic" &&
                "bg-gradient-to-r from-harvest_gold-400 via-harvest_gold-600 to-harvest_gold-800 text-black"
              }
              ${
                tier === "Premium" &&
                "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lg text-black"
              }
              `}
                >
                  <p>{tier}</p>
                </div>
                <div
                  className={`badge ${
                    isPublished
                      ? "bg-fuchsia-700 shadow-lg"
                      : "bg-white border-gray-500"
                  }`}
                >
                  <p
                    className={`${
                      isPublished ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {isPublished ? "Published" : "Not Published"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
