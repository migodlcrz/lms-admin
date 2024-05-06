import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  _id?: string;
  courseID: string;
  courseName: string;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [profile, setProfile] = useState<Course | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [courseForm, setCourseForm] = useState<Course>({
    courseID: "",
    courseName: "",
  });

  const fetchCourse = async () => {
    const response = await fetch("http://localhost:4000/api/course", {
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("COURSE ID: ", courseForm.courseID);
    console.log("COURSE NAME: ", courseForm.courseName);
    const response = await fetch("http://localhost:4000/api/course/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseForm),
    });

    const json = await response.json();

    setLoading(false);
    clearForm();
    setOpenModal(false);

    if (response.ok) {
      toast.success(json.message);
      fetchCourse();
    } else {
      toast.error(json.error);
    }
  };

  const handleDelete = async (_id: string) => {
    const response = await fetch(
      `http://localhost:4000/api/course/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);

      setProfile(null);
      fetchCourse();
    } else {
      console.log(json.error);
    }
  };

  const clearForm = () => {
    setCourseForm({
      courseID: "",
      courseName: "",
    });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 pl-[90px] p-2 bg-white h-screen">
      <div className="flex flex-col lg:flex-row justify-start py-2">
        <h2 className="font-bold text-cerulean">Course Management</h2>
      </div>
      <div className="flex flex-col lg:flex-row h-full space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col items-start shadow-xl border-2 border-black w-full lg:w-1/2 h-full">
          {courses ? (
            <>
              <div className="flex bg-cerulean w-full p-2 ">
                <div className="flex flex-row space-x-3">
                  <label className="input input-bordered flex items-center gap-2 rounded-none">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Search Course"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </label>
                  <button className="btn rounded-none bg-white text-cerulean">
                    Search
                  </button>{" "}
                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="btn rounded-none bg-white text-cerulean"
                  >
                    Add
                  </button>
                  <Modal
                    open={openModal}
                    onClose={() => {
                      setOpenModal(false);
                    }}
                    center
                  >
                    <div className="flex flex-col mt-10 space-y-2">
                      <form
                        className="flex flex-col form space-y-2"
                        onSubmit={handleSubmit}
                      >
                        <p className="text-black">Course ID:</p>
                        <input
                          onChange={handleFormChange}
                          className="input input-bordered input-primary rounded-none"
                          type="text"
                          name="courseID"
                          value={courseForm.courseID}
                          disabled={loading}
                        />
                        <p className="text-black">Course Name:</p>
                        <input
                          onChange={handleFormChange}
                          className="input input-bordered input-primary rounded-none"
                          type="text"
                          name="courseName"
                          value={courseForm.courseName}
                          disabled={loading}
                        />
                        <button
                          onClick={() => {
                            setLoading(true);
                          }}
                          className="btn rounded-none bg-cerulean text-white"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="grid place-items-center h-full w-full">
                              <span className="loading loading-spinner loading-lg"></span>
                            </div>
                          ) : (
                            <>Add course</>
                          )}
                        </button>
                      </form>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="flex flex-row w-full m-0 bg-cerulean max-h-full overflow-x-auto">
                <table className="table">
                  <thead className="sticky top-0 bg-cerulean shadow-md">
                    <tr className="text-white">
                      <th className="font-bold text-lg">Course</th>
                      <th className="font-bold text-lg">ID</th>
                      <th className="font-bold text-lg">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses &&
                      courses.map((course, index) => (
                        <tr
                          onClick={() => {
                            setProfile(course);
                          }}
                          className={`hover:bg-gray-500 cursor-pointer ${
                            index % 2 === 0 ? "bg-white" : "bg-slate-300"
                          } ${profile === course ? "bg-gray-500" : ""}`}
                        >
                          <th>{index + 1}</th>
                          <td className="font-bold">{course.courseID}</td>
                          <td>{course.courseName}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="grid place-items-center h-full w-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
        <div className="flex h-auto w-full lg:w-1/2 bg-white border-2 border-slate-400 shadow-md p-3">
          {profile ? (
            <div className="flex flex-col w-full h-full ">
              <div className="flex flex-col h-full w-full bg-slate-200 p-2 space-y-2">
                <div className="flex flex-row w-full justify-between">
                  <label className="font-bold text-2xl">
                    Course ID:{" "}
                    <span className="font-normal">{profile.courseID}</span>
                  </label>
                  <label className="font-bold text-2xl">
                    Course Name:{" "}
                    <span className="font-normal">{profile.courseName}</span>
                  </label>
                </div>
                <div className="flex flex-row items-end justify-center space-x-[10%]">
                  <button className="btn w-20 rounded-none text-cerulean">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(String(profile._id));
                    }}
                    className="btn w-20 rounded-none text-cerulean"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setProfile(null);
                    }}
                    className="btn w-20 rounded-none text-cerulean"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid place-items-center h-full w-full bg-slate-400">
              <p className="text-black font-bold text-xl">No selected course</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
