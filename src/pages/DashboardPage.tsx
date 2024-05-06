import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex flex-col space-y-2 lg:space-y-0 pl-[90px] p-2 bg-white h-screen">
        <div className="flex flex-row bg-gray-200 h-full py-4">
          <div className="flex flex-col w-full p-10 items-center border-r-[1px] border-gray-400">
            <div className="flex flex-col justify-center bg-green-500 h-40 w-[50%] text-white font-bold text-center p-2 ">
              <p>Courses</p>
              <p className="text-8xl">20</p>
            </div>
            <div>test</div>
          </div>
          <div className="flex flex-col w-full p-10 items-center border-l-[1px] border-gray-400">
            <div className="flex flex-col justify-center bg-purple-600 h-40 w-[50%] text-white font-bold text-center p-2">
              <p>Students</p>
              <p className="text-8xl">10</p>
            </div>
            <div>test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
