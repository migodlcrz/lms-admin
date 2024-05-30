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
    <div className="flex flex-row w-full h-screen space-y-0 space-x-4 p-6 bg-poly-bg bg-cover bg-center">
      <div className="flex flex-col items-start shadow-xl space-y-3 border-2 bg-slate-50 rounded-xl w-3/4 h-full p-3">
        <div className="w-full h-1/3 bg-red-400"></div>
        <div className="flex flex-row w-full h-2/3 space-x-3">
          {" "}
          <div className="flex flex-col items-start shadow-xl w-full rounded-xl h-full bg-slate-200 p-3">
            {users ? (
              <>
                <div className="flex w-full pb-3">
                  <div className="flex flex-row space-x-3">
                    <input
                      className="input rounded-xl border-harvest_gold border-2 bg-white"
                      placeholder="Search a user"
                      type="text"
                      name=""
                      id=""
                    />
                    <button className="btn rounded-xl bg-white text-fuchsia text-lg font-bold">
                      Search
                    </button>
                  </div>
                </div>
                <div
                  className="flex flex-row w-full m-0 max-h-full overflow-x-auto"
                  style={{
                    scrollbarColor: "#006992 #FFFFFF ",
                    scrollbarWidth: "thin",
                  }}
                >
                  <table className="table">
                    <thead className="sticky top-0 bg-fuchsia shadow-md">
                      <tr className="text-black">
                        <th className="font-bold text-lg">User</th>
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
                            className={`group hover:bg-gray-300 ${
                              index % 2 === 0 ? "bg-white" : "bg-fuchsia-300"
                            }`}
                          >
                            <th>{index + 1}</th>
                            <td className="font-bold">
                              {user.firstName} {user.lastName}
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`/students/${user._id}`);
                                }}
                                className="flex justify-center group relative text-2xl transition-color duration-300 rounded-xl p-2 w-full"
                              >
                                <span className="absolute inset-0 flex text-lg font-bold items-center justify-center w-full h-full bg-yellow-400 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  Details
                                </span>
                                <span className="relative z-10 group-hover:opacity-0 transition duration-300">
                                  <LuPencilLine />{" "}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  handleDelete(user._id);
                                }}
                                className="flex justify-center group relative text-2xl transition-color duration-300 rounded-xl p-2 w-full"
                              >
                                <span className="absolute inset-0 flex text-lg font-bold items-center justify-center w-full h-full bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  Delete
                                </span>
                                <span className="relative z-10 group-hover:opacity-0 transition duration-300">
                                  <MdOutlineDeleteOutline />
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

export default StudentPage;
