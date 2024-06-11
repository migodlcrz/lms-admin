import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Guy from "../images/guy.png";
import { APP_URL } from "../Url";
import { toast } from "react-toastify";
import { Course, EditCourseForm } from "../interfaces/CourseInterface";
import { User } from "../interfaces/UserInterface";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "react-responsive-modal";
import { LuPencilLine } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuthContext } from "../hooks/useAuthContext";

const CourseDetails = () => {
  const { user } = useAuthContext();
  const { courseId } = useParams<{ courseId: string }>();
  const port = APP_URL;
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [courseUsers, setCourseUsers] = useState<User[]>([]);
  const [editCourseForm, setEditCourseForm] = useState<EditCourseForm>({
    courseName: null,
    courseID: null,
    description: null,
  });
  const [page, setPage] = useState("Modules");
  const [studentDeleteModal, setStudentDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const fetchCourse = async () => {
    const response = await fetch(`${port}/api/course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    setCourseDetail(json);
  };

  const fetchCourseUsers = async (studentIds: any[]) => {
    try {
      const users = [];
      for (const studentId of studentIds) {
        const response = await fetch(`${port}/api/user/${studentId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user ${studentId}`);
        }

        const json = await response.json();
        users.push(json);
      }

      setCourseUsers(users);
    } catch (error) {
      console.error("Error fetching course users:", error);
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
    fetchCourse();
    toast.success(json.message);
    setEditMode(false);
  };

  const DeleteCourse = async (id: string) => {
    const response = await fetch(`${port}/api/course/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      navigate("/courses");
    } else {
      toast.error(json.error);
    }
  };

  const handleEditForm = (field: string, value: string) => {
    setEditCourseForm({ ...editCourseForm, [field]: value });
  };

  const unenrollUser = async (studentId: string | undefined) => {
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

    fetchCourse();
  };

  const updatePublishStatus = async (
    _id: string,
    status: boolean | undefined
  ) => {
    const response = await fetch(`${port}/api/course/edit/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: String(!status) }),
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);
    fetchCourse();
    setEditMode(false);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (courseDetail && courseDetail.students) {
      fetchCourseUsers(courseDetail.students);
    }
  }, [courseDetail]);

  // console.log(courseDetail?.publisher);
  // console.log(user.user_.email || user.name_);

  return (
    <>
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
          <div
            onClick={() => {
              navigate("/courses");
            }}
            className="w-full text-black text-3xl hover:text-fuchsia transition-color duration-300 cursor-pointer"
          >
            <IoMdArrowRoundBack />
          </div>
          <img
            src={Guy}
            alt="profile"
            className="w-full h-full rounded-xl shadow-lg object-cover object-center"
          />
          <div className="flex flex-col space-y-2 w-full h-full">
            <h2 className="text-black text-3xl font-bold text-center">
              {editMode ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      duration: 1,
                      bounce: 0.4,
                    },
                  }}
                  className="w-full h-10"
                >
                  Edit Mode
                </motion.div>
              ) : (
                // <input className="input" />
                <div className="w-full h-10">
                  {courseDetail?.courseName} - {courseDetail?.courseID}
                </div>
              )}
            </h2>
            <div className="flex flex-col w-full h-full bg-slate-100 rounded-xl shadow-lg p-3">
              {editMode ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      duration: 1,
                      bounce: 0.4,
                    },
                  }}
                  className="flex flex-col w-full h-full space-y-1"
                >
                  <h2 className="text-xl text-black font-bold">Course Name</h2>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleEditForm("courseName", e.target.value);
                    }}
                    type="text"
                    name=""
                    id=""
                    className="input input-bordered border-fuchsia w-full h-10 py-1"
                    placeholder={courseDetail?.courseName}
                    data-testid="course-name"
                  />
                  <h2 className="text-xl text-black font-bold">Course Id</h2>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleEditForm("courseID", e.target.value);
                    }}
                    type="text"
                    name=""
                    id=""
                    className="input input-bordered border-fuchsia w-full h-10 py-1"
                    placeholder={courseDetail?.courseID}
                    data-testid="course-code"
                  />
                  <h2 className="text-xl text-black font-bold">
                    Course Description
                  </h2>
                  <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleEditForm("description", e.target.value);
                    }}
                    className="textarea textarea-bordered border-fuchsia h-full py-1"
                    placeholder={courseDetail?.description}
                    data-testid="course-details"
                  ></textarea>
                </motion.div>
              ) : (
                <>
                  <h3 className="flex flex-col text-black text-xl font-bold">
                    {/* Email: <span className="font-semibold">{userInfo.email}</span> */}{" "}
                    Course Description:{" "}
                    <span className="text-lg font-semibold">
                      {courseDetail?.description}
                    </span>
                    Publisher:{" "}
                    <span className="text-lg font-semibold">
                      {courseDetail?.publisher}
                    </span>
                  </h3>
                </>
              )}
            </div>
          </div>

          {courseDetail?.publisher === (user.user_.email || user.name_) && (
            <div className="flex flex-row space-x-3">
              {editMode ? (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        duration: 1,
                        bounce: 0.4,
                      },
                    }}
                    onClick={() => {
                      setEditCourseForm({
                        courseName: null,
                        courseID: null,
                        description: null,
                        tier: null,
                        isPublished: null,
                      });
                      EditCourse(String(courseDetail?._id));
                    }}
                    disabled={
                      (editCourseForm.courseName === null ||
                        editCourseForm.courseName === "") &&
                      (editCourseForm.courseID === null ||
                        editCourseForm.courseID === "") &&
                      (editCourseForm.description === null ||
                        editCourseForm.description === "")
                    }
                    className="flex justify-end disabled:bg-gray-500 first-letter:font-bold text-3xl text-white disabled:text-gray-200 hover:text-black transition-colors bg-green-600 rounded-full p-2 shadow-lg"
                    data-testid="edit-course"
                  >
                    <FaSave />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        duration: 1,
                        bounce: 0.4,
                      },
                    }}
                    onClick={() => setEditMode(false)}
                    className="tooltip flex justify-end first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2 shadow-lg"
                    data-tip="Back"
                  >
                    <IoArrowBackOutline />
                  </motion.button>
                </>
              ) : (
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-row">
                    <button
                      onClick={() => {
                        updatePublishStatus(
                          String(courseDetail?._id),
                          courseDetail?.isPublished
                        );
                      }}
                      className={`tooltip flex justify-end first-letter:font-bold text-3xl hover:text-black transition-colors rounded-full p-2 shadow-lg px-4 ${
                        courseDetail?.isPublished
                          ? "bg-gray-400 text-black"
                          : "bg-green-600 text-white"
                      }`}
                      data-testid="publish-unpublish-course"
                    >
                      <p className="text-xl font-bold">
                        {courseDetail?.isPublished ? "Unpublish" : "Publish"}
                      </p>
                    </button>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <button
                      onClick={() => setEditMode(true)}
                      className="tooltip flex justify-end first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2 shadow-lg"
                      data-tip="Edit"
                      data-testid="edit-course"
                    >
                      <LuPencilLine />
                    </button>
                    <button
                      onClick={() => setOpenDeleteModal(true)}
                      className="tooltip flex justify-end first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-red-600 rounded-full p-2 shadow-lg"
                      data-tip="Delete"
                      data-testid="delete-course"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
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
          className="flex flex-col w-full h-full bg-slate-50 rounded-xl p-3 space-y-3"
        >
          <div className="flex flex-row w-full rounded-lg bg-slate-200 p-1">
            <button
              onClick={() => {
                setPage("Modules");
              }}
              className={`w-1/2 rounded-md p-1 items-center justify-center text-center transition-colors duration-200 ${
                page === "Modules" && " bg-fuchsia"
              }`}
            >
              <h3 className="text-black font-semibold">Modules</h3>
            </button>

            <button
              onClick={() => {
                setPage("Enrollees");
              }}
              className={`w-1/2 rounded-md p-1 items-center justify-center text-center transition-colors duration-200 ${
                page === "Enrollees" && " bg-fuchsia"
              }`}
            >
              <h3 className="text-black font-semibold">Enrollees</h3>
            </button>
          </div>
          {page === "Modules" && (
            <div className="w-full h-full p-1">
              Module 1, Module 2, Module 3
            </div>
          )}
          {page === "Enrollees" && (
            <div className="flex flex-col space-y-1 w-full h-full rounded-xl p-1">
              {courseUsers?.length !== 0 ? (
                <table className="table">
                  <thead className="sticky top-0 bg-fuchsia shadow-md">
                    <tr className="text-black">
                      <th className="font-bold text-lg">User</th>
                      <th className="font-bold text-lg">Name</th>
                      <th className="font-bold text-lg">Email</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {courseUsers?.map((user, index) => (
                      <tr
                        onClick={() => {
                          setStudentDeleteModal(true);
                          setDeleteId(user._id);
                        }}
                        key={index}
                        className={`group hover:bg-gray-300 ${
                          index % 2 === 0 ? "bg-white" : "bg-fuchsia-300"
                        }`}
                      >
                        <th>{index + 1}</th>
                        <td className="font-bold">
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <h2 className="text-black font-bold text-2xl">
                    There are no users enrolled in this course
                  </h2>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
      >
        <div className="flex flex-col mt-10 space-y-2 w-[48rem] items-center justify-center">
          <h2 className="text-black text-3xl font-bold w-full text-center">
            Are you sure you want to delete {courseDetail?.courseName}?
          </h2>
          <div className="flex flex-row justify-evenly w-full">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="btn text-black text-2xl font-semibold "
              data-testid="cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setOpenDeleteModal(false);
                DeleteCourse(String(courseDetail?._id));
              }}
              className="btn text-white text-2xl font-semibold bg-fuchsia border-fuchsia hover:bg-red-600 hover:border-red-600 shadow-md"
              data-testid="proceed"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={studentDeleteModal}
        onClose={() => setStudentDeleteModal(false)}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
      >
        <div className="flex flex-col mt-10 space-y-2 w-[48rem] items-center justify-center">
          <h2 className="text-black text-3xl font-bold w-full text-center">
            Are you sure you want to delete this user?
          </h2>
          <div className="flex flex-row justify-evenly w-full">
            <button
              onClick={() => setStudentDeleteModal(false)}
              className="btn text-black text-2xl font-semibold "
              data-testid="cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setStudentDeleteModal(false);
                unenrollUser(deleteId);
                setDeleteId("");
              }}
              className="btn text-white text-2xl font-semibold bg-fuchsia border-fuchsia hover:bg-red-600 hover:border-red-600 shadow-md"
              data-testid="proceed"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CourseDetails;
