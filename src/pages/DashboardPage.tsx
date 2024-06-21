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
import { motion } from "framer-motion";
import { FaPerson } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import CalendarPanel from "../components/CalendarPanel";
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

const barData = [
  {
    name: "Page A",
    uv: 100,
    pv: 72,
  },
  {
    name: "Page B",
    uv: 100,
    pv: 23,
  },
  {
    name: "Page C",
    uv: 100,
    pv: 90,
  },
  {
    name: "Page D",
    uv: 100,
    pv: 45,
  },
  {
    name: "Page E",
    uv: 100,
    pv: 80,
  },
];

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-raisin_black-300 z-0 p-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              duration: 1,
              delay: 0.2,
              bounce: 0.4,
            },
          }}
          className="flex flex-col w-3/4 space-y-1"
        >
          <div className="flex flex-col w-full">
            <h1 className="text-white text-4xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex flex-col h-[100%] w-full pr-2 space-y-2">
            <div className="flex flex-row h-28 bg-gradient-to-r items-center shadow-md from-raisin_black-500 to-raisin_black-400 rounded-md py-3 px-7">
              <p className="text-fuchsia-50 font-semibold w-4/5 text-xs md:text-xl">
                You are doing great! You have published{" "}
                <span className="font-bold text-fuchsia">10</span> students
                enrolled in your courses and published{" "}
                <span className="font-bold text-fuchsia">3</span> of them!
              </p>
              <div className="w-1/5">
                <Lottie animationData={animation} className="mb-20" />
              </div>
            </div>
            <div className="flex flex-col h-full shadow-md space-y-2">
              <div className="flex flex-row h-1/3 w-full space-x-2">
                <div className="flex flex-row items-start justify-start w-3/5 h-full shadow-md rounded-md">
                  <div className=" h-full w-1/3 bg-poly-bg-fuchsia bg-center rounded-l-md">
                    <p className="flex items-center justify-center w-full h-full text-white font-bold text-xl text-center">
                      Here are the top 5 performers!
                    </p>
                  </div>
                  <div className="h-full w-2/3 p-2 bg-gradient-to-r from-raisin_black-500 to-raisin_black-400 rounded-r-md">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={barData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barSize={20}
                      >
                        <XAxis
                          dataKey="name"
                          scale="point"
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          dataKey="pv"
                          fill="#be6ab7"
                          background={{ fill: "#eee" }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between w-1/5 h-full shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                      <FaPerson />
                    </div>
                    <span>Students</span>
                  </p>
                  <h3 className="text-white font-bold text-5xl">10</h3>
                  <button className="text-fuchsia font-semibold">
                    Add Course
                  </button>
                </div>
                <div className="flex flex-col items-start justify-between w-1/5 h-full shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                      <FaBookOpen />
                    </div>
                    <span>Courses</span>
                  </p>
                  <h3 className="text-white font-bold text-5xl">3</h3>
                  <button className="text-fuchsia font-semibold">
                    Add Course
                  </button>
                </div>
              </div>
              <div className="flex flex-row h-2/3 w-full space-x-2">
                <div className="w-1/2 h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md p-6">
                  <div className="flex flex-row items-center space-x-2 h-[10%]">
                    <div className="flex items-center justify-center text-fuchsia-400 text-2xl w-10 h-10 bg-fuchsia-800 rounded-full">
                      <IoIosStats />
                    </div>
                    <span className="text-white font-semibold text-xl">
                      Statistics
                    </span>
                  </div>
                  <div className="h-[90%]">
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
                </div>
                <div className="w-1/2 h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md"></div>
              </div>
            </div>
          </div>
        </motion.div>
        <CalendarPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
