import React, { useEffect, useState } from "react";

interface Course {
  courseID: string;
  courseName: string;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [profile, setProfile] = useState<Course | null>(null);

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

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 pl-[90px] p-2 bg-white h-screen">
      <div className="flex flex-col lg:flex-row justify-start py-2">
        <h2 className="font-bold text-cerulean">Course Management</h2>
      </div>
      <div className="flex flex-col lg:flex-row h-full space-y-4 lg:space-y-0 lg:space-x-4">
        {courses ? (
          <div className="flex flex-col items-start shadow-xl border-2 border-black w-full lg:w-1/2 h-full">
            <div className="flex bg-cerulean w-full p-2 ">
              <div className="flex flex-row space-x-3">
                <input
                  className="input rounded-none border-slate-200 border-2"
                  placeholder="Search a user"
                  type="text"
                  name=""
                  id=""
                />
                <button className="btn rounded-none bg-white text-cerulean">
                  Search
                </button>{" "}
                <button className="btn rounded-none bg-white text-cerulean">
                  Add
                </button>
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
                  {courses.map((course, index) => (
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
          </div>
        ) : (
          <div className="grid place-items-center h-full w-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <div className="flex h-full w-full lg:w-1/2 bg-white border-2 border-slate-400 shadow-md p-3">
          {profile ? (
            <div className="flex flex-col w-full h-full ">
              <div className="flex flex-row h-2/6 w-full bg-slate-200">
                <div className="avatar h-full w-1/3  p-2">
                  <div className="w-full ">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="flex flex-col h-full w-2/3 p-2">
                  <label className="font-bold text-2xl">Course ID:</label>
                  <div>{profile.courseID}</div>
                  <label className="font-bold text-2xl">Course Name: </label>
                  <div>{profile.courseName}</div>
                  <div className="flex flex-row h-full items-end justify-center space-x-[10%]">
                    <button className="btn w-20 rounded-none text-cerulean">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        // handleDelete(profile._id);
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
                      Clear
                    </button>
                  </div>
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
