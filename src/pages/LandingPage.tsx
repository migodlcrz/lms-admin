import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { APP_URL } from "../Url";
// import heroimage from "/hero-image.jpg";

const LandingPage = () => {
  const port = APP_URL;
  console.log("PORT: ", port);
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-center w-full h-screen shadow-xl bg-white text-center space-y-4">
          <div
            className="flex flex-col w-full lg:w-3/5 space-y-6 justify-center items-start p-10 bg-poly-bg bg-cover bg-center"
            // style={{
            //   backgroundImage: `url(${heroimage})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <h1 className="text-start text-white text-2xl lg:text-6xl">
              <span className="text-fuchsia-50 font-semibold">
                Fly Toward Your Goals with
              </span>{" "}
              <span className="text-fuchsia-500 text-shadow shadow-black">
                Learnify
              </span>
            </h1>
            <div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                <button className="btn bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 hover:bg-fuchsia-300 shadow-md shadow-black border-fuchsia hover:border-fuchsia">
                  <p className="text-black font-bold text-md lg:text-xl">
                    Visit User Website
                  </p>
                </button>
              </motion.div>
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
