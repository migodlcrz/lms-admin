import React, { useEffect, useState } from "react";

interface Users {
  _id: string;
  name: string;
  email: string;
}

const StudentPage = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [profile, setProfile] = useState<Users>();

  const fetchUser = async () => {
    const response = await fetch("http://localhost:4000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log("RESPONSE OK");
      setUsers(json);
    } else {
      console.log("RESPONSE NOT OK");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 pl-[90px] p-2 bg-white h-screen">
      <div className="flex flex-col lg:flex-row justify-between py-2">
        <div className="flex flex-row space-x-3">
          <input
            className="input rounded-none border-slate-200 border-2"
            placeholder="Search a user"
            type="text"
            name=""
            id=""
          />
          <button className="btn rounded-none bg-cerulean text-white">
            Search
          </button>
        </div>
        <h2 className="font-bold text-cerulean">User Management</h2>
      </div>
      <div className="flex flex-col lg:flex-row h-full space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col items-start shadow-xl border-2 border-black w-full lg:w-1/2 h-full">
          <div className="flex flex-row w-full m-0 bg-cerulean max-h-full overflow-x-auto">
            <table className="table">
              <thead className="sticky top-0 bg-cerulean shadow-md">
                <tr className="text-white">
                  <th className="font-bold text-lg">User</th>
                  <th className="font-bold text-lg">Name</th>
                  <th className="font-bold text-lg">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    onClick={() => {
                      setProfile(user);
                    }}
                    className={`hover:bg-gray-500 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-300"
                    }`}
                  >
                    <th>{index + 1}</th>
                    <td className="font-bold">{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
                  <label className="font-bold text-2xl">
                    Name: {profile?.name}
                  </label>
                  <div>{profile?.name}</div>
                  <label className="font-bold text-2xl">Email: </label>
                  <div>{profile?.email}</div>
                  <div className="flex flex-row h-full items-end justify-center space-x-8">
                    <button
                      className="btn"
                      onClick={() => {
                        if (document) {
                          const modal = document.getElementById(
                            "my_modal_1"
                          ) as HTMLFormElement;
                          modal.showModal();
                        }
                      }}
                    >
                      open modal
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <button className="btn w-20 rounded-none">Edit</button>
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
    </div>
  );
};

export default StudentPage;
