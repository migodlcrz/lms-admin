"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoginForm from "../components/LoginForm";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-center w-full h-screen shadow-xl bg-white text-center space-y-4 px-10">
          <div className="flex flex-col w-full lg:w-3/5 space-y-6 justify-center items-start">
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
              <a
                href="http://localhost:3000"
                className="btn bg-cerulean rounded-none hover:bg-cerulean-300 shadow-md shadow-black border-cerulean"
              >
                <h3 className="text-white font-bold text-xl">
                  Visit Learnify Student
                </h3>
              </a>
            </div>
          </div>
          <div className="w-2/5">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
