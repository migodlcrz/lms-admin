import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const SettingsPage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="w-screen h-screen p-10 bg-raisin_black-300">
      <div className="flex flex-col w-full h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md p-5">
        <div className="text-white font-bold text-2xl">Name:</div>
        <button
          onClick={() => {
            logout();
          }}
          className="btn"
        >
          Logout
        </button>
        {/* <div>Name: {user.user_}</div>
        <div>Email: {user.email}</div>
        <button
          onClick={() => {
            logout();
          }}
          className="btn"
        >
          Logout
        </button> */}
      </div>
    </div>
    // <div className="flex flex-col space-y-2 lg:space-y-0 ml-[250px] p-2 bg-white h-screen">
    //   <div className="grid h-full w-full place-items-center bg-gray-200 p-4">
    //     <div>Name: {user.user_}</div>
    //     <div>Email: {user.email}</div>
    //     <button
    //       onClick={() => {
    //         logout();
    //       }}
    //       className="btn"
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>
  );
};

export default SettingsPage;
