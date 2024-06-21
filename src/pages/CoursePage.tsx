import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCourseForm from "../components/AddCourseForm";
import CustomCalendar from "../components/Calendar";
import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { Course } from "../interfaces/CourseInterface";
import { APP_URL } from "../Url";
import { FaCheck, FaLock, FaPenNib, FaPerson } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import CalendarPanel from "../components/CalendarPanel";

interface EditCourseForm {
  courseName?: string | null;
  courseID?: string | null;
  description?: string | null;
  tier?: string | null;
  isPublished?: boolean | null;
}

const CoursePage = (props: React.PropsWithChildren) => {
  const { user } = useAuthContext();
  const port = APP_URL;
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[] | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [courseForm, setCourseForm] = useState<Course>({
    courseID: "",
    courseName: "",
    publisher: user.user_.email || user.name_,
    tier: "",
    description: "",
  });
  //fetches the courses when page is rendered
  const fetchCourse = async () => {
    const response = await fetch(`${port}/api/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const courses = await response.json();

    if (response.ok) {
      setCourses(courses);
    } else {
      console.log("RESPONSE NOT OK");
    }
  };

  //handle form change when adding course
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseForm((prevState) => ({
      ...prevState,
      [name]: value,
      publisher: user.user_.email || user.name_,
    }));
  };

  //handles adding of course
  const AddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    console.log("PUMASOK");
    console.log(courseForm);
    const response = await fetch(`${port}/api/course/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseForm),
    });

    const json = await response.json();

    setLoading(false);

    if (response.ok) {
      toast.success(json.message);
      fetchCourse();
      clearForm();
      setOpenModal(false);
    } else {
      toast.error(json.error);
      fetchCourse();
    }
  };

  //closes the form when done adding
  const clearForm = () => {
    setCourseForm({
      courseID: "",
      courseName: "",
      tier: "",
      description: "",
    });
  };

  useEffect(() => {
    fetchCourse();
  }, [props]);

  return (
    <div
      className="flex flex-row w-full h-screen space-y-0 space-x-2 p-6 bg-raisin_black-300"
      data-testid="courses-page"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            duration: 1,
            delay: 0.2,
            bounce: 0.4,
          },
        }}
        className="flex flex-row items-start rounded-xl w-3/4 h-full space-x-2"
      >
        <div className="flex flex-col w-1/4 h-full">
          <div className="flex flex-col w-full h-full space-y-2">
            <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
              <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                  <FaBookOpen />
                </div>
                <span>Courses</span>
              </p>
              <h3 className="text-white font-bold text-5xl">10</h3>
              <button className="text-fuchsia font-semibold text-start">
                Total published and unpublished courses.
              </button>
            </div>
            <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
              <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                  <FaPenNib />
                </div>
                <span>Published</span>
              </p>
              <h3 className="text-white font-bold text-5xl">10</h3>
              <button className="text-fuchsia font-semibold text-start">
                Total published courses.
              </button>
            </div>
            <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
              <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                  <FaLock />
                </div>
                <span>Unpublished</span>
              </p>
              <h3 className="text-white font-bold text-5xl">10</h3>
              <button className="text-fuchsia font-semibold text-start">
                Total unpublished courses.
              </button>
            </div>
            <div
              onClick={() => {
                setOpenModal(true);
              }}
              className="flex flex-col cursor-pointer items-start justify-start w-full h-1/4 shadow-md bg-fuchsia-700 hover:bg-fuchsia-800 text-black hover:text-white transition-colors duration-300 rounded-md p-3"
              data-testid="add-course"
            >
              <h3 className="flex flex-col items-center justify-center font-bold text-5xl w-full h-full">
                <FaPlus />
                <p className="font-semibold text-xl">Add Course</p>
              </h3>
            </div>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              center
              closeOnEsc
              classNames={{
                modal: "customModalClass",
              }}
            >
              <AddCourseForm
                courseForm={courseForm}
                loading={loading}
                handleFormChange={handleFormChange}
                AddCourse={AddCourse}
              />
            </Modal>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-3/4 h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 p-5 space-y-3 rounded-md">
          <>
            <div className="flex flex-row w-full justify-between">
              <h3 className="text-3xl font-bold text-white">Course List</h3>
              <span className="flex flex-row space-x-2">
                <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                  <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                    F
                  </div>
                  <div>Free</div>
                </p>
                <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                  <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                    B
                  </div>
                  <div>Basic</div>
                </p>
                <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                  <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                    P
                  </div>
                  <div>Premium</div>
                </p>
                <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                  <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                    NP
                  </div>
                  <div>Not Published</div>
                </p>
                <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                  <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                    NP
                  </div>
                  <div>Not Published</div>
                </p>
              </span>
            </div>
            <div className="flex flex-row justify-between w-full pl-5 pr-10">
              <div className="text-white font-bold text-xl">Title</div>
              <div className="flex flex-row space-x-10 text-white font-bold text-xl">
                <div className="text-white font-bold text-xl">Tier</div>
                <div className="text-white font-bold text-xl">Status</div>
              </div>
            </div>
            <div className="overflow-y-scroll w-full h-full">
              <table className="min-w-full">
                <tbody>
                  {courses &&
                    courses.map((course, index) => (
                      <CourseCard
                        key={index}
                        courseID={course._id || ""}
                        courseName={course.courseName}
                        description={course.description}
                        tier={course.tier}
                        publisher={course.publisher!}
                        isPublished={course.isPublished!}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </motion.div>
      <CalendarPanel />
    </div>
  );
};

export default CoursePage;
