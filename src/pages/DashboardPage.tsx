import Lottie from "lottie-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import animation from "../images/online.json";
// import "rsuite/dist/rsuite.min.css";

const data = [
  {
    subject: "Math",
    A: 87,
    fullMark: 100,
  },
  {
    subject: "Chinese",
    A: 50,
    fullMark: 100,
  },
  {
    subject: "English",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Geography",
    A: 99,
    fullMark: 100,
  },
  {
    subject: "Physics",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "History",
    A: 65,
    fullMark: 100,
  },
];

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      {/* <div className="h-14 shadow-lg z-10">hello</div> */}
      <div className="flex flex-row h-full bg-poly-bg z-0 p-6">
        <div className="w-3/4">
          {/* Good day */}
          <div className="flex flex-col w-full h-[10%]">
            <h1 className="text-white text-4xl">
              Good Day,{" "}
              <span className="text-fuchsia-600">{user.user_.firstName}</span>
            </h1>
            <h3 className="text-white font-semibold text-sm">
              Here is your profile overview
            </h3>
          </div>
          {/* <div className="flex-grow bg-yellow-400 h-[90%]">hello</div> */}
          {/* Course progress */}
          <div className="flex flex-col h-[90%] w-full pr-6 space-y-6">
            <div className="flex flex-row h-28 bg-gradient-to-l items-center shadow-md from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 rounded-xl py-3 px-7">
              <p className="text-fuchsia-50 font-bold w-4/5 text-xs md:text-xl">
                You are doing great! So far you have completed 60% of your
                courses. Keep up the good job!
              </p>
              <div className="w-1/5">
                <Lottie animationData={animation} className="mb-20" />
              </div>
            </div>
            <div className="flex flex-col h-full bg-oslo_gray-50 rounded-xl shadow-md p-5 space-y-2">
              <div className="flex flex-row items-center w-full border-b-2 border-oslo_gray-300 py-2">
                <h2 className="font-bold text-fuchsia-500 text-3xl  pr-3 mr-3">
                  Course Progress
                </h2>
              </div>
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full h-1/3 pb-3">
                  <div className="w-full h-1/6 font-bold text-black">
                    Courses Status
                  </div>
                  <div className="flex flex-row w-full h-5/6 space-x-3">
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-fuchsia rounded-xl p-3">
                      <p className="font-semibold text-white">Total Courses</p>
                      <h3 className="text-white font-bold text-5xl">10</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-fuchsia-700 bg-fuchsia-400 rounded-xl p-3">
                      <p className="font-semibold text-black">Not Started</p>
                      <h3 className="text-black font-bold text-5xl">10</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-fuchsia-700 bg-fuchsia-400 rounded-xl p-3">
                      <p className="font-semibold text-black">In Progress</p>{" "}
                      <h3 className="text-black font-bold text-5xl">12</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md border-2 border-dashed border-fuchsia-700 bg-fuchsia-400 rounded-xl p-3">
                      <p className="font-semibold text-black">Finished</p>{" "}
                      <h3 className="text-black font-bold text-5xl">15</h3>
                    </div>
                  </div>
                </div>
                <div className="flex w-full h-2/3">
                  <div className=" h-full w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={data}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                          name="Mike"
                          dataKey="A"
                          stroke="#be6ab7"
                          fill="#be6ab7"
                          fillOpacity={0.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-full w-1/2 py-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full w-1/4">
          <div className="h-full w-full">
            {/* Profile */}
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
                    {user.user_.firstName} {user.user_.lastName}
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
    </div>
  );
};

export default DashboardPage;
