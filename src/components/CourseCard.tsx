import { motion } from "framer-motion";
import React from "react";

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
          className={`card w-80 bg-base-100 shadow-xl h-96 ${
            isPublished ? "border-4 border-fuchsia-700" : ""
          }`}
        >
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body p-3">
            <h2 className="card-title flex flex-row justify-center items-center">
              <p
                className="text-black w-full truncate tooltip"
                data-tip={courseName}
              >
                {courseName}
              </p>
            </h2>
            <p className="text-black">{description}</p>
            <div className="card-actions justify-end">
              <div
                className={`badge 
                ${tier === "Free" && "bg-black text-white font-semibold"} 
                ${
                  tier === "Basic" &&
                  "bg-gradient-to-r from-harvest_gold-400 via-harvest_gold-600 to-harvest_gold-800 text-black font-semibold"
                }
                ${
                  tier === "Premium" &&
                  "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lgtext-black font-semibold"
                }
                `}
              >
                <p>{tier}</p>
              </div>
              <div
                className={`badge ${
                  isPublished ? "bg-fuchsia-700 shadow-lg" : "border-gray-400"
                }`}
              >
                <p
                  className={`${isPublished ? "text-white" : "text-gray-400"}`}
                >
                  {isPublished ? "Published" : "Not Published"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
