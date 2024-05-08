import React from "react";
import Lottie from "lottie-react";
import landing from "../images/landing.json";

const NotLoggedIn = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cream">
      <div className="flex flex-col h-full place-items-center justify-center">
        <div className="h-[50%] w-[30%]">
          <Lottie className="h-[100%] w-[100%]" animationData={landing} />
        </div>
        <h2 className="text-black font-bold">Not Logged In.</h2>
        <h3 className="font-bold text-black">Cannot access page.</h3>
        {/* <button
          onClick={() => {
            navigate("/");
          }}
          className="btn p-2"
        >
          Back to home
        </button> */}
      </div>
    </div>
  );
};

export default NotLoggedIn;
