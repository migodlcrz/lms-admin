import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import { APP_URL } from "../Url";

interface User {
  _id: string;
  firstName: string;
  lastName: string;

  email: string;
}

const StudentPage = () => {
  const port = APP_URL;
  const [users, setUsers] = useState<User[] | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

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
      setProfile(null);
      fetchUser();
    } else {
      toast.error(json.error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-row lg:flex-row w-full h-screen space-y-4 lg:space-y-0 lg:space-x-4 p-6 bg-poly-bg">
      <div className="flex flex-col items-start shadow-xl border-2 border-black w-full lg:w-1/2 max-h-full">
        {users ? (
          <>
            <div className="flex bg-cerulean w-full p-2">
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
                </button>
              </div>
            </div>
            <div
              className="flex flex-row w-full m-0 bg-cerulean max-h-full overflow-x-auto"
              style={{
                scrollbarColor: "#006992 #FFFFFF ",
                scrollbarWidth: "thin",
              }}
            >
              <table className="table">
                <thead className="sticky top-0 bg-cerulean shadow-md">
                  <tr className="text-white">
                    <th className="font-bold text-lg">User</th>
                    <th className="font-bold text-lg">Name</th>
                    <th className="font-bold text-lg">Email</th>
                  </tr>
                </thead>
                <tbody className="">
                  {users &&
                    users.map((user, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          setProfile(user);
                        }}
                        className={`cursor-pointer hover:bg-gray-500 ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-300"
                        } ${profile === user ? "bg-gray-500" : ""}`}
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
            </div>
          </>
        ) : (
          <div className="grid place-items-center h-full w-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
      <div className="flex max-h-full w-full lg:w-1/2 bg-white border-2 border-slate-400 shadow-md p-3">
        {profile ? (
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row h-2/6 w-full bg-slate-200">
              <div className="avatar h-full w-1/3  p-2">
                <div className="w-full ">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Student"
                  />
                </div>
              </div>
              <div className="flex flex-col h-full w-2/3 p-2">
                <label className="flex flex-row font-bold text-2xl">
                  Name:
                </label>
                <div>
                  {profile?.firstName} {profile?.lastName}
                </div>
                <label className="font-bold text-2xl">Email: </label>
                <div>{profile?.email}</div>
                <div className="flex flex-row h-full items-end justify-center space-x-[10%]">
                  <button className="btn w-20 rounded-none text-cerulean">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(profile._id);
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
            <p className="text-black font-bold text-xl">No selected user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
