"use client";
import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import landing from "../public/online.json";
import Header from "../components/Header";
// import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Courses from "../components/Courses";
import noriel from "../images/noriel.png";
import dmitri from "../images/dmitri.png";
import guy from "../images/guy.png";
import guy2 from "../images/guy2.png";
import Lottie from "lottie-react";
import landing from "../images/online.json";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-center w-full h-3/5 shadow-xl bg-cream text-center space-y-4 px-10">
          <div className="flex flex-col w-full lg:w-2/3 space-y-6 justify-center items-start">
            <h1 className="text-start text-black">
              Make your dreams to reality
            </h1>
            <h3 className="text-black text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the {"industry's"} standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h3>
            <div>
              <button
                onClick={() => navigate("/register")}
                className="btn bg-cerulean rounded-none hover:bg-cerulean-300"
              >
                <h3 className="text-white font-bold text-xl">Start Now</h3>
              </button>
            </div>
          </div>
          <div className="w-1/3">
            <Lottie className="h-[100%] w-[100%]" animationData={landing} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center h-2/5 w-full bg-harvest_gold">
          <div className="w-2/5 h-full relative">
            {/* <Image
              src="/guy.png"
              alt="Loading"
              layout="fill"
              objectFit="cover"
            /> */}
            <Carousel
              showArrows={false}
              autoPlay={true}
              interval={1500}
              infiniteLoop={true}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
            >
              <div>
                <img
                  src={noriel}
                  alt="Banner image"
                  width={1200}
                  height={300}
                />
              </div>
              <div>
                <img
                  src={dmitri}
                  alt="Banner image"
                  width={1200}
                  height={300}
                />
              </div>
              <div>
                <img src={guy} alt="Banner image" width={1200} height={300} />
              </div>
              <div>
                <img src={guy2} alt="Banner image" width={1200} height={300} />
              </div>
            </Carousel>
          </div>
          <div className=" flex flex-col w-2/3 space-y-2 items-center m-10 ">
            <h1 className="text-black">Try our new courses </h1>
            <button
              onClick={() => {
                const coursesSection = document.getElementById("courses");
                if (coursesSection) {
                  coursesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-5xl text-black font-bold hover:text-white"
            >
              {/* <MdKeyboardDoubleArrowDown /> */}V
            </button>
          </div>
        </div>
      </div>
      <div
        id="courses"
        className="flex flex-row h-screen overflow-hidden bg-cream border-t-8 border-cerulean"
      >
        <div className="flex flex-col bg-harvest_gold w-1/4 p-10 space-y-2">
          <h1 className="text-black">Courses</h1>
          <h3 className="text-justify">
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the {"industry's"} standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
          </h3>
        </div>
        <div>
          <Courses />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
