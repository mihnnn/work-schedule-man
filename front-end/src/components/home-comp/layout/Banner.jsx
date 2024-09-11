import React from "react";
import { Link } from "react-router-dom";
import homeVideo from '../../../assets/videos/home-video.mp4'
import "../../styles/Banner.css"
import "../../styles/App.css"
import { useSelector } from "react-redux";

function Banner() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser: ",currentUser)

  let getStartedLink;
  if (!currentUser) {
    getStartedLink = "/login";
  } else if (currentUser && !currentUser.hasCompletedBoarding) {
    getStartedLink = "/onboarding";
  } else {
    getStartedLink = "/app/dashboard";
  }

  return (
    <div className="h-screen w-full flex justify-center flex-col items-center shadow-inner bg-black bg-opacity-50">
      <video className="object-cover w-full h-full fixed -z-10" src={homeVideo} autoPlay loop muted>
        {" "}
      </video>
      <h1 className="text-center text-white text-9xl mt-[-100px] md:text-5xl sm:text-4xl ">Work Schedule Management</h1>
      <p className="mb-5 text-white text-2xl mt-4">Scheduler for small bussinesses</p>
      
      {/* welcome message */}
      {currentUser ? (
        <div className="banner-btns-container">
          <Link
            to={getStartedLink}
            className= "btn btn-outline btn-xl bg-[#333]"
          >
            <span className="text-[#ddd]">GET STARTED</span>
          </Link>

          <p className="text-white text-xl mt-2">
            Welcome, {currentUser.displayName}!{" "}
          </p>
        </div>
      ) : (
        <div className="banner-btns-container">
          <Link
            to={"/signup"}
            className= "btn btn-outline btn-xl bg-[#333]"
          >
            <span className="text-[#ddd]">GET STARTED</span>
          </Link>

          <p className="text-white text-xl mt-2">
            Already have an account? {" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "#fff" }}
            >
              Log in
            </Link>
          </p>
        </div>
      )
      }
    </div>
  );
}

export default Banner;
