import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Guy from "../images/guy.png";
import { APP_URL } from "../Url";
import { toast } from "react-toastify";
import { Course, EditCourseForm } from "../interfaces/CourseInterface";
import { Module } from "../interfaces/ModuleInterface";
import { User } from "../interfaces/UserInterface";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "react-responsive-modal";
import { LuPencilLine } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuthContext } from "../hooks/useAuthContext";
import { Carousel } from "react-responsive-carousel";

const CourseDetails = () => {
  const { user } = useAuthContext();
  const { courseId } = useParams<{ courseId: string }>();
  const port = APP_URL;
  const navigate = useNavigate();

  const quizzes = [
    "Quiz 1: Introduction to Programming",
    "Quiz 2: Basics of HTML",
    "Quiz 3: CSS Fundamentals",
    "Quiz 4: JavaScript Basics",
    "Quiz 5: Advanced JavaScript",
    "Quiz 6: React Introduction",
    "Quiz 7: React Hooks",
    "Quiz 8: State Management",
    "Quiz 9: Building Applications",
    "Quiz 10: Deployment",
  ];

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [studentDeleteModal, setStudentDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [addModule, setAddModule] = useState<boolean>(false);
  const [openModule, setOpenModule] = useState<boolean>(false);

  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [courseUsers, setCourseUsers] = useState<User[]>([]);
  const [courseModules, setCourseModules] = useState<Module[]>([]);
  const [editCourseForm, setEditCourseForm] = useState<EditCourseForm>({
    courseName: null,
    courseID: null,
    description: null,
    tier: null,
  });

  const [page, setPage] = useState("Modules");
  const [deleteId, setDeleteId] = useState("");
  const [selectedOption, setSelectedOption] = useState(courseDetail?.tier);

  const [moduleName, setModuleName] = useState<String | null>(null);
  const [moduleDescription, setModuleDescription] = useState<String | null>(
    null
  );
  const [module, setModule] = useState<Module | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const fetchCourseModules = async (moduleIds: any[]) => {
    try {
      const modules = [];
      for (const moduleId of moduleIds) {
        const response = await fetch(`${port}/api/module/${moduleId}`);

        if (!response.ok) {
          return toast.error(`Failed to fetch user ${moduleId}`);
        }

        const json = await response.json();
        modules.push(json);
      }

      setCourseModules(modules);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourseUsers = async (studentIds: any[]) => {
    try {
      const users = [];
      for (const studentId of studentIds) {
        const response = await fetch(`${port}/api/user/${studentId}`);

        if (!response.ok) {
          toast.error(`Failed to fetch user ${studentId}`);
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

  const CreateModule = async () => {
    const response = await fetch(
      `${port}/api/module/create/${courseDetail?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleName: moduleName,
          moduleDescription: moduleDescription,
        }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
    } else {
      toast.error(json.error);
    }

    fetchCourse();
  };

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const handleEditForm = (field: string, value: string) => {
    setEditCourseForm({ ...editCourseForm, [field]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    } else {
      setPreviewURL(null);
    }
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

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select a file first.");
    }

    const formData = new FormData();
    formData.append("picture", file);

    setUploading(true);

    try {
      const response = await fetch(
        `${port}/api/module/uploadFile/${module?._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const json = await response.json();

      if (response.ok) {
        toast.success(json.message);
        fetchCourse();
      } else {
        toast.error(json.error);
      }
    } catch (err) {
    } finally {
      setOpenModule(false);
      setPreviewURL(null);
      setUploading(false);
    }
  };

  const handleDelete = async (moduleID: string, lesson: string) => {
    try {
      const response = await fetch(
        `${port}/api/module/deleteFile/${moduleID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: lesson,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        toast.success(json.message);
        fetchCourse();
        setOpenModule(false);
        setPreviewURL(null);
        setUploading(false);
      } else {
        toast.error(json.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting the file.");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (courseDetail && courseDetail.students) {
      fetchCourseUsers(courseDetail.students);
    }
  }, [courseDetail]);

  useEffect(() => {
    if (courseDetail && courseDetail.students) {
      fetchCourseModules(courseDetail.modules!);
    }
  }, [courseDetail]);

  useEffect(() => {
    if (courseDetail?.tier) {
      setSelectedOption(courseDetail.tier);
    }
  }, [courseDetail]);

  return (
    <>
      <div className="flex flex-row w-screen h-screen space-x-2 bg-raisin_black-300 p-6">
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
          className="flex flex-col w-1/3 h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md p-3 space-y-2"
        >
          <div
            onClick={() => {
              navigate("/courses");
            }}
            className="w-full text-white text-3xl hover:text-fuchsia transition-color duration-300 cursor-pointer"
          >
            <IoMdArrowRoundBack />
          </div>
          <img
            src={Guy}
            alt="profile"
            className="w-full h-full rounded-md object-cover object-center"
          />
          <div className="flex flex-col space-y-2 w-full h-full">
            <h2 className="text-white text-3xl font-bold text-center">
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
            <div className="flex flex-col w-full h-full bg-transparent rounded-xl shadow-lg p-3">
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
                  <h2 className="text-xl text-white font-bold">Course Name</h2>
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
                  <h2 className="text-xl text-white font-bold">Course Id</h2>
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
                  <h2 className="text-xl text-white font-bold">
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
                  <h2 className="text-xl text-white font-bold">Tier</h2>
                  <div className="flex flex-col">
                    <div
                      className="w-full flex flex-row justify-around"
                      data-testid="course-tier"
                    >
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="Free"
                          checked={selectedOption === "Free"}
                          onChange={(e) => {
                            handleOptionChange(e);
                            handleEditForm("tier", e.target.value);
                          }}
                          className="radio checked:bg-fuchsia"
                          data-testid="free-tier"
                        />
                        <label className="text-white">Free</label>
                      </div>
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="Basic"
                          checked={selectedOption === "Basic"}
                          onChange={(e) => {
                            handleOptionChange(e);
                            handleEditForm("tier", e.target.value);
                          }}
                          className="radio checked:bg-fuchsia"
                          data-testid="basic-tier"
                        />
                        <label className="text-white">Basic</label>
                      </div>
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier" // Add the name attribute
                          value="Premium"
                          checked={selectedOption === "Premium"}
                          onChange={(e) => {
                            handleOptionChange(e);
                            handleEditForm("tier", e.target.value);
                          }}
                          className="radio checked:bg-fuchsia"
                          data-testid="premium-tier"
                        />
                        <label className="text-white">Premium</label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h3 className="flex flex-col text-white text-xl font-bold">
                    Course Description:{" "}
                    <span className="text-lg font-semibold">
                      {courseDetail?.description}
                    </span>
                    Publisher:{" "}
                    <span className="text-lg font-semibold">
                      {courseDetail?.publisher}
                    </span>
                    Tier:{" "}
                    <span className="text-lg font-semibold">
                      {courseDetail?.tier}
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
                      if (
                        (editCourseForm.courseName === null ||
                          editCourseForm.courseName === "") &&
                        (editCourseForm.courseID === null ||
                          editCourseForm.courseID === "") &&
                        (editCourseForm.description === null ||
                          editCourseForm.description === "") &&
                        (editCourseForm.tier === null ||
                          editCourseForm.tier === "")
                      ) {
                        toast.error("No changed field");
                      } else {
                        setEditCourseForm({
                          courseName: null,
                          courseID: null,
                          description: null,
                          tier: null,
                          isPublished: null,
                        });
                        EditCourse(String(courseDetail?._id));
                      }
                    }}
                    className={`flex justify-end first-letter:font-bold text-3xl text-white disabled:text-gray-200 hover:text-black transition-colors bg-green-600 rounded-full p-2 shadow-lg ${
                      (editCourseForm.courseName === null ||
                        editCourseForm.courseName === "") &&
                      (editCourseForm.courseID === null ||
                        editCourseForm.courseID === "") &&
                      (editCourseForm.description === null ||
                        editCourseForm.description === "") &&
                      "bg-gray-500"
                    }`}
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
          className="flex flex-col w-full h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md p-3 space-y-3"
        >
          <div className="flex flex-row w-full rounded-lg bg-raisin_black p-1">
            <button
              onClick={() => {
                setPage("Modules");
              }}
              className={`w-1/2 rounded-md p-1 items-center justify-center text-center transition-colors duration-200 ${
                page === "Modules" && " bg-fuchsia"
              }`}
            >
              <h3 className="text-white font-semibold">Modules</h3>
            </button>
            <button
              onClick={() => {
                setPage("Quizzes");
              }}
              className={`w-1/2 rounded-md p-1 items-center justify-center text-center transition-colors duration-200 ${
                page === "Quizzes" && " bg-fuchsia"
              }`}
            >
              <h3 className="text-white font-semibold">Quizzes</h3>
            </button>{" "}
            <button
              onClick={() => {
                setPage("Enrollees");
              }}
              className={`w-1/2 rounded-md p-1 items-center justify-center text-center transition-colors duration-200 ${
                page === "Enrollees" && " bg-fuchsia"
              }`}
            >
              <h3 className="text-white font-semibold">Enrollees</h3>
            </button>
          </div>
          {page === "Modules" && (
            <div className="w-full h-full p-1 overflow-y-auto">
              <div
                onClick={() => {
                  setAddModule(true);
                }}
                className="flex flex-row w-full p-3 space-x-2 items-center border-b-[0.5px] cursor-pointer border-raisin_black-600 hover:bg-raisin_black-300 transition-colors"
              >
                <h3 className="flex items-center justify-center text-white font-bold w-full">
                  Add Module
                </h3>
              </div>
              {courseModules.map((module, index) => (
                <div
                  onClick={() => {
                    setOpenModule(true);
                    setModule(module);
                  }}
                  key={index}
                  className="flex flex-row w-full p-2 space-x-2 items-center border-b-[0.5px] border-raisin_black-600 cursor-pointer border-raisin_black-600 hover:bg-raisin_black-300 transition-colors"
                >
                  <p className="flex flex-row items-center text-sm font-semibold text-black space-x-2">
                    <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                      {index + 1}
                    </div>
                  </p>
                  <h3 className="text-white font-bold py-3">{module.name}</h3>
                </div>
              ))}
            </div>
          )}
          {page === "Quizzes" && (
            <div className="w-full h-full p-1">
              {quizzes.map((module, index) => (
                <div className="flex flex-row w-full p-2 space-x-2 items-center border-b-[0.5px] border-raisin_black-600">
                  <p className="flex flex-row items-center text-sm font-semibold text-black space-x-2">
                    <div className="flex items-center justify-center text-fuchsia-400 text-sm w-7 h-7 bg-fuchsia-800 rounded-full">
                      {index + 1}
                    </div>
                  </p>
                  <h3 className="text-black font-bold py-3">{module}</h3>
                </div>
              ))}
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
                  <h2 className="text-white font-bold text-2xl">
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
      <Modal
        open={addModule}
        onClose={() => setAddModule(false)}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
      >
        <div className="flex flex-col mt-10 space-y-3 w-[47rem] items-center justify-center">
          <div className="w-full text-center">
            <h2 className="text-white font-bold">Add Module</h2>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <h3 className="text-white font-semibold">Module Name</h3>
            <input
              onChange={(e) => {
                setModuleName(e.target.value);
              }}
              type="text"
              className="rounded-md h-10 px-2"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <h3 className="text-white font-semibold">Description</h3>
            <textarea
              onChange={(e) => {
                setModuleDescription(e.target.value);
              }}
              className="h-40 rounded md p-2"
            />
          </div>
          <button
            onClick={() => {
              CreateModule();
              setModuleName(null);
              setModuleDescription(null);
              setAddModule(false);
            }}
            className="bg-fuchsia py-2 px-4 rounded-md font-semibold text-white hover:bg-fuchsia-700 transition-colors"
          >
            Create
          </button>
        </div>
      </Modal>
      <Modal
        open={openModule}
        onClose={() => {
          setOpenModule(false);
          setPreviewURL(null);
          setModule(null);
        }}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
      >
        <div className="flex flex-col mt-10 space-y-3 w-[47rem] items-center justify-center p-5">
          <div className="flex flex-col w-full border-b-[0.5px] border-raisin_black-600 space-y-2 py-2">
            <h2 className="text-white font-bold text-2xl">{module?.name}</h2>
            <p className="text-white font-normal">{module?.description}</p>
          </div>
          <div className="flex flex-col w-full border-b-[0.5px] border-raisin_black-600 space-y-2 py-2">
            <h2 className="text-white font-bold text-2xl">Lessons</h2>
            <div className="text-white font-normal">
              {module?.lessons.length === 0 ? (
                <div className="h-96 w-full border-4 border-dashed border-slate-600 rounded-md flex items-center justify-center">
                  No Modules yet.
                </div>
              ) : (
                <Carousel>
                  {module?.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="h-96 w-full rounded-md flex items-center justify-center relative"
                    >
                      <img
                        src={lesson}
                        alt={`Lesson ${index + 1}`}
                        className="object-cover h-full w-full"
                      />
                      <button
                        onClick={() => handleDelete(module._id, lesson)}
                        className="absolute top-2 left-2 bg-red-600 text-white rounded-md p-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full border-b-[0.5px] border-raisin_black-600 space-y-2 py-2">
            <h2 className="text-white font-bold text-2xl">Add a lesson</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="text-white"
            />
            {previewURL ? (
              <div className="h-96 w-full bg-white border-4 border-dashed border-slate-600 rounded-md flex items-center justify-center">
                {file!.type.startsWith("image") ? (
                  <img
                    src={previewURL}
                    alt="File preview"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <p>{file!.name}</p>
                )}
              </div>
            ) : (
              <div className="h-96 w-full bg-white border-4 border-dashed border-slate-600 rounded-md"></div>
            )}
            <button
              className="text-white bg-fuchsia-500 w-full h-10 rounded-md"
              onClick={handleUpload}
              disabled={uploading || !file}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CourseDetails;
