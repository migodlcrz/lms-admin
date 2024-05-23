import { motion } from "framer-motion";
import React from "react";

interface CourseProps {
  courseID: string;
  courseName: string;
  publisher: string;
  tier: string;
  description: string;
}

const CourseCard: React.FC<CourseProps> = ({
  courseID,
  courseName,
  publisher,
  tier,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      className="w-full"
    >
      <div
        className="p-3"
        style={{ transition: "opacity 0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <div className="card w-80 bg-base-100 shadow-xl h-96">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title flex flex-row justify-between items-center">
              {courseName}
              <div className="badge badge-secondary">{tier}</div>
            </h2>
            <p className="text-black">{description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">
                <p className="text-black">Fashion</p>
              </div>
              <div className="badge badge-outline">
                <p className="text-black">Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
