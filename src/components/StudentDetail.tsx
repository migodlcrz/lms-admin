import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APP_URL } from "../Url";
import { toast } from "react-toastify";
import { User } from "../interfaces/UserInterface";
import Guy from "../images/dmitri.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Course } from "../interfaces/CourseInterface";
import { motion } from "framer-motion";

const StudentDetail = () => {
  const port = APP_URL;
  const { studentId } = useParams<{ studentId: string }>();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  const fetchUserInfo = async () => {
    const response = await fetch(`${port}/api/user/${studentId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    setUserInfo(json);
  };

  const fetchUserCourses = async (courseIds: any[]) => {
    console.log(courseIds);
    try {
      const courses = await Promise.all(
        courseIds.map(async (courseId) => {
          const response = await fetch(`${port}/api/course/${courseId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const json = await response.json();
            throw new Error(json.error);
          }

          return response.json();
        })
      );
      console.log(courses);

      setUserCourses(courses);
    } catch (error) {
      toast.error("Failed to fetch courses.");
    }
  };

  const unenrollUser = async (courseId: string | undefined) => {
    const response = await fetch(
      `${port}/api/user/unenroll/${studentId}/${courseId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);

    fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.courses) {
      fetchUserCourses(userInfo.courses);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row w-screen h-screen space-x-6 bg-poly-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 1,
            bounce: 0.4,
          },
        }}
        className="flex flex-col w-1/3 h-full bg-slate-50 rounded-xl p-3 space-y-2"
      >
        <div className="w-full">
          <IoMdArrowRoundBack />
        </div>
        <img src={Guy} alt="profil" className="w-full rounded-xl shadow-lg" />
        <h2 className="text-black text-3xl font-bold text-center">
          {userInfo.firstName} {userInfo.lastName}
        </h2>
        <div className="flex flex-col w-full h-full bg-slate-100 rounded-xl shadow-lg p-3">
          <h3 className="text-black text-xl font-bold">
            Email: <span className="font-semibold">{userInfo.email}</span>
          </h3>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 1,
            bounce: 0.4,
          },
        }}
        className="flex flex-col w-full h-full bg-slate-50 rounded-xl p-3"
      >
        <div className="w-full">
          <h2 className="text-2xl font-bold text-black">Courses</h2>
        </div>
        <div className="flex flex-col space-y-1 w-full h-full p-2 rounded-xl">
          {userCourses?.length !== 0 ? (
            userCourses.map((course, index) => {
              return (
                <div
                  onClick={() => {
                    unenrollUser(course._id);
                  }}
                  className="w-full bg-poly-bg-fuchsia p-2 rounded-2xl"
                >
                  <div className="flex w-full bg-white rounded-xl p-2">
                    {course.courseName}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h2 className="text-black font-bold text-2xl">
                This student isn't enrolled to any courses
              </h2>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDetail;
