import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import { APP_URL } from "../Url";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";
import { User } from "../interfaces/UserInterface";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import { FaBookOpen, FaLock, FaPenNib, FaPlus } from "react-icons/fa6";
import CalendarPanel from "../components/CalendarPanel";

const StudentPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const port = APP_URL;
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchUser = async () => {
    const response = await fetch(`${port}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();

    if (response.ok) {
      setUsers(users);
    } else {
      console.log("RESPONSE NOT OK");
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`${port}/api/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      fetchUser();
    } else {
      toast.error(json.error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div
      className="flex flex-row w-full h-screen space-y-0 space-x-2 p-6 bg-raisin_black-300 bg-cover bg-center"
      data-testid="students-page"
    >
      <div className="flex flex-row items-start space-x-2 w-3/4 h-full">
        <div className="flex flex-col w-1/4 h-full space-y-2">
          <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
            <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
              <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                <FaBookOpen />
              </div>
              <span>Students</span>
            </p>
            <h3 className="text-white font-bold text-5xl">10</h3>
            <button className="text-fuchsia font-semibold text-start">
              Total students enrolled.
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
              // setOpenModal(true);
            }}
            className="flex flex-col cursor-pointer items-start justify-start w-full h-1/4 shadow-md bg-fuchsia-700 hover:bg-fuchsia-800 text-black hover:text-white transition-colors duration-300 rounded-md p-3"
            data-testid="add-course"
          >
            <h3 className="flex flex-col items-center justify-center font-bold text-5xl w-full h-full">
              <FaPlus />
              <p className="font-semibold text-xl">Add Course</p>
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-3/4 h-full rounded-md p-5 space-x-3 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
          <div className="flex flex-col items-start shadow-xl w-full rounded-xl h-full">
            {users ? (
              <>
                <div className="flex w-full pb-3">
                  <div className="flex flex-row space-x-3">
                    <h3 className="font-bold text-white text-3xl">
                      Student List
                    </h3>
                  </div>
                </div>
                <div
                  className="flex flex-row w-full m-0 max-h-full overflow-x-auto"
                  style={{
                    scrollbarColor: "#006992 #FFFFFF ",
                    scrollbarWidth: "thin",
                  }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 shadow-md">
                      <tr className="text-white">
                        <th className="font-bold text-lg">Name</th>
                        <th className="font-bold text-lg">Email</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {users &&
                        users.map((user, index) => (
                          <tr
                            key={index}
                            className="group border-b-[0.1px] border-gray-700 h-16"
                          >
                            <td className="font-bold text-white">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="text-white">{user.email}</td>
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`/students/${user._id}`);
                                }}
                                className="flex justify-center group relative text-2xl transition-color duration-300 rounded-xl p-2 w-full"
                                data-testid="select-student-{id}"
                              >
                                <span className="absolute inset-0 flex text-lg font-bold items-center justify-center w-full h-full text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <p className="flex flex-row items-center text-lg font-semibold text-yellow-400 space-x-2">
                                    <div className="flex items-center justify-center text-2xl w-10 h-10 rounded-full">
                                      <LuPencilLine />
                                    </div>
                                  </p>
                                </span>
                                <span className="relative z-10 group-hover:opacity-0 transition duration-300">
                                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                                    <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                                      <LuPencilLine />
                                    </div>
                                  </p>
                                </span>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  handleDelete(user._id);
                                }}
                                className="flex justify-center group relative text-2xl transition-color duration-300 rounded-xl p-2 w-full"
                                data-testid="select-student-{id}"
                              >
                                <span className="absolute inset-0 flex text-lg font-bold items-center justify-center w-full h-full rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <p className="flex flex-row items-center text-lg font-semibold text-red-800 space-x-2">
                                    <div className="flex items-center justify-center  text-2xl w-10 h-10 rounded-full">
                                      <MdOutlineDeleteOutline />
                                    </div>
                                  </p>
                                </span>
                                <span className="relative z-10 group-hover:opacity-0 transition duration-300">
                                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                                    <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                                      <MdOutlineDeleteOutline />
                                    </div>
                                  </p>
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="grid place-items-center h-full w-full">
                <span className="loading loading-spinner loading-lg" />
              </div>
            )}
          </div>
        </div>
      </div>
      <CalendarPanel />
    </div>
  );
};

export default StudentPage;
