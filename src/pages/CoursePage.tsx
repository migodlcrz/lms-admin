import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../components/AdminHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import pic from "../images/dmitri.png";
import { Course } from "../interfaces/CourseInterface";
import AddCourseForm from "../components/AddCourseForm";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import Calendar from "../components/Calendar";
import CustomCalendar from "../components/Calendar";
import CourseCard from "../components/CourseCard";
import { AnimatePresence, motion } from "framer-motion";
import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import ProfileActions from "../components/ProfileActions";
import ProfileEditActions from "../components/ProfileEditActions";
import { APP_URL } from "../Url";
import { useNavigate } from "react-router-dom";

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
  const [profile, setProfile] = useState<Course | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [courseForm, setCourseForm] = useState<Course>({
    courseID: "",
    courseName: "",
    publisher: user.user_.email || user.name_,
    tier: "",
    description: "",
  });

  const [editCourseForm, setEditCourseForm] = useState<EditCourseForm>({
    courseName: null,
    courseID: null,
    description: null,
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

  const handleEditForm = (field: string, value: string) => {
    setEditCourseForm({ ...editCourseForm, [field]: value });
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

  const EditCourse = async (_id: string) => {
    const response = await fetch(`${port}/api/course/edit/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCourseForm),
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);
    fetchCourse();
    setEditMode(false);
    setProfile(null);
  };

  const updatePublishStatus = async (_id: string, status: boolean) => {
    console.log("PUMASOK SA UPDATE");
    console.log(JSON.stringify({ isPublished: String(status) }));
    const response = await fetch(`${port}/api/course/edit/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: String(status) }),
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);
    fetchCourse();
    setEditMode(false);
    setProfile(null);
  };

  //handle delete course
  const DeleteCourse = async (_id: string) => {
    const response = await fetch(`${port}/api/course/delete/${_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);

      setProfile(null);
      fetchCourse();
    } else {
      console.log(json.error);
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
    <div className="flex flex-row w-full h-screen space-y-0 space-x-4 p-6 bg-poly-bg bg-cover bg-center">
      <div className="flex flex-col items-start shadow-xl space-y-3 border-2 bg-slate-50 rounded-xl w-3/4 h-full p-3">
        <div className="flex flex-row w-full h-1/4">
          <div className="flex flex-row w-full space-x-3">
            <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-fuchsia rounded-xl p-3">
              <p className="font-semibold text-white">Total Courses</p>
              <h3 className="text-white font-bold text-5xl">10</h3>
            </div>
            <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-fuchsia-700 bg-fuchsia-400 rounded-xl p-3">
              <p className="font-semibold text-black">Published</p>
              <h3 className="text-black font-bold text-5xl">10</h3>
            </div>
            <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-fuchsia-700 bg-fuchsia-400 rounded-xl p-3">
              <p className="font-semibold text-black">Unpublished</p>{" "}
              <h3 className="text-black font-bold text-5xl">12</h3>
            </div>
            <div
              onClick={() => {
                setOpenModal(true);
              }}
              className="flex flex-col cursor-pointer items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-oslo_gray-700 bg-oslo_gray-400 hover:bg-oslo_gray-300 text-black hover:text-white transition-colors duration-300 rounded-xl p-3"
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
        <div className="flex flex-col items-center justify-center w-full h-3/4 bg-poly-bg-fuchsia p-3 space-y-3 rounded-xl">
          {profile ? (
            <motion.div
              key={profile.courseName}
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
              // exit={{ opacity: 0 }}
              className="flex flex-col h-full w-full bg-slate-50 rounded-xl p-3"
            >
              <div className="flex flex-row justify-between h-16 w-full">
                <h2 className="flex flex-row items-center text-black font-bold">
                  <p className=" truncate">Course Information</p>
                </h2>
                {editMode ? (
                  <ProfileEditActions
                    profile={profile}
                    editCourseForm={editCourseForm}
                    setEditCourseForm={setEditCourseForm}
                    setEditMode={setEditMode}
                    setProfile={setProfile}
                    EditCourse={EditCourse}
                    DeleteCourse={DeleteCourse}
                  />
                ) : (
                  <ProfileActions
                    profile={profile}
                    editCourseForm={editCourseForm}
                    setEditCourseForm={setEditCourseForm}
                    setEditMode={setEditMode}
                    setProfile={setProfile}
                    updatePublishStatus={updatePublishStatus}
                    DeleteCourse={DeleteCourse}
                  />
                )}
              </div>
              <div className="flex flex-col w-full h-full space-y-3">
                <div className="flex flex-row w-full h-1/2 space-x-3">
                  <div className="w-1/2 h-full bg-poly-bg-fuchsia rounded-2xl p-3">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      alt="Shoes"
                      className="h-full w-full bg-cover bg-center rounded-xl"
                    />
                  </div>
                  {editMode ? (
                    <div className="flex flex-col w-1/2 h-full space-y-2">
                      <div className="flex flex-row w-full items-center justify-between">
                        Edit{" "}
                      </div>
                      <div className="flex flex-row w-full items-center justify-between">
                        <label className="text-black font-bold text-xl w-1/2">
                          Course Name:
                        </label>
                        <input
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleEditForm("courseName", e.target.value);
                          }}
                          type="text"
                          className="input border-fuchsia border-2 w-1/2 bg-white"
                          placeholder={profile.courseName}
                        />
                      </div>
                      <div className="flex flex-row w-full items-center justify-between">
                        <label className="text-black font-bold text-xl w-1/2">
                          Course ID:
                        </label>
                        <input
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleEditForm("courseID", e.target.value);
                          }}
                          type="text"
                          className="input border-fuchsia border-2 w-1/2 bg-white"
                          placeholder={profile.courseID}
                        />
                      </div>
                      <div className="flex flex-row w-full items-center justify-between">
                        <label className="text-black font-bold text-xl w-1/2">
                          Description:
                        </label>
                        <textarea
                          className="textarea textarea-bordered border-2 resize-none border-fuchsia w-1/2 bg-white"
                          placeholder={profile.description}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            handleEditForm("description", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          duration: 1,
                          delay: 0.1,
                          bounce: 0.4,
                        },
                      }}
                      className="flex flex-col w-1/2 h-full"
                    >
                      <h2 className="flex w-full justify-center font-bold text-fuchsia-700">
                        {profile.courseName}
                      </h2>
                      <h3 className="flex w-full justify-between text-fuchsia font-semibold text-xl">
                        Code:{" "}
                        <span className="text-black">{profile.courseID}</span>
                      </h3>
                      <h3 className="flex w-full justify-between text-fuchsia font-semibold text-xl">
                        Created by:{" "}
                        <span className="text-black truncate">
                          {profile.publisher}
                        </span>
                      </h3>
                      <h3 className="flex w-full justify-between text-fuchsia font-semibold text-xl">
                        Modules:{" "}
                        <span className="text-black">
                          {profile.modules?.length}
                        </span>
                      </h3>
                      <h3 className="flex w-full justify-between text-fuchsia font-semibold text-xl">
                        Enrollees:{" "}
                        <span className="text-black">
                          {profile.students?.length}
                        </span>
                      </h3>
                      <div className="flex flex-col w-full h-full">
                        <h3 className="flex w-full justify-between text-fuchsia font-semibold text-xl">
                          Description:
                        </h3>
                        <div className="h-full w-full text-black bg-slate-200 rounded-xl p-2 shadow-inner">
                          {profile.description}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-roww-full h-1/2 space-x-3">
                  <div className="flex flex-col w-1/2 h-full bg-fuchsia rounded-xl">
                    lagay mo module list
                  </div>
                  <div className="flex flex-col w-1/2 h-full bg-fuchsia rounded-xl">
                    lagay mo student list
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1,
                    delay: 0.1,
                    bounce: 0.4,
                  },
                }}
                className="flex flex-row w-full"
              >
                <div className="flex flex-row space-x-2 w-1/2">
                  <div className="relative">
                    <input
                      type="text"
                      className="input rounded-xl pl-10 pr-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-end space-x-3 w-1/2">
                  <h2 className="font-bold text-white text-2xl">Sort:</h2>
                  <select className="select w-full max-w-xs bg-white">
                    <option disabled selected>
                      Pick your favorite Simpson
                    </option>
                    <option>Homer</option>
                    <option>Marge</option>
                    <option>Bart</option>
                    <option>Lisa</option>
                    <option>Maggie</option>
                  </select>
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
                    delay: 0.1,
                    bounce: 0.4,
                  },
                }}
                className="flex flex-wrap items-center justify-center w-full h-full overflow-y-scroll bg-white border-4 border-fuchsia-800 rounded-xl"
                style={{ scrollbarColor: "", scrollbarWidth: "thin" }}
              >
                {courses &&
                  courses.map((course, index) => (
                    <tr
                      onClick={() => {
                        // setProfile(course);
                        navigate(`/courses/${course._id}`);
                      }}
                      key={index}
                    >
                      <CourseCard
                        courseID={course.courseID}
                        courseName={course.courseName}
                        description={course.description}
                        tier={course.tier}
                        publisher={course.publisher!}
                        isPublished={course.isPublished!}
                      />
                    </tr>
                  ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row h-full w-1/4">
        <div className="h-full w-full">
          <div className="flex flex-col space-y-3 bg-oslo_gray-50 shadow-md h-full w-full rounded-xl p-6 items-center">
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
                  {user.user_.firstName ||
                    user.user_.lastName | user.name_ | user.email}
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
      </div>
    </div>
  );
};

export default CoursePage;
