import { motion } from "framer-motion";
import React from "react";
import Guy from "../images/guy.png";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";

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
  const navigate = useNavigate();
  return (
    <motion.tr
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={() => {
        navigate(`/courses/${courseID}`);
      }}
    >
      <td className="">
        <div
          className="w-full p-2 border-b-[0.5px] border-gray-700"
          style={{ transition: "opacity 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div className="w-full h-10 rounded-2xl bg-cover bg-center ">
            <div className="flex flex-row p-3 h-full w-full justify-between">
              <h2 className="flex flex-row justify-center items-center">
                <p
                  className="text-white font-bold w-full truncate tooltip text-start text-lg"
                  data-tip={courseName}
                >
                  {courseName}
                </p>
              </h2>
              <div className="flex flex-row space-x-14 px-3">
                <div className="flex items-center justify-center">
                  <p>
                    {tier === "Free" && (
                      <>
                        <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                          <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                            F
                          </div>
                        </p>
                      </>
                    )}
                    {tier === "Basic" && (
                      <>
                        <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                          <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                            B
                          </div>
                        </p>
                      </>
                    )}
                    {tier === "Premium" && (
                      <>
                        <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                          <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                            P
                          </div>
                        </p>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p
                    className={`${
                      isPublished ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {isPublished ? (
                      <>
                        {" "}
                        <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                          <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                            P
                          </div>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                          <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                            NP
                          </div>
                        </p>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

export default CourseCard;
