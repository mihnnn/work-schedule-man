import React, { useContext } from "react";
import { Link } from "react-router-dom";
import homeVideo from '../../../assets/videos/home-video.mp4'
import "../../styles/Banner.css"
import "../../styles/App.css"
// import { useAuthContext } from "../../../context/AuthContext";
import { useSelector } from "react-redux";

function Banner() {
  //auth context
  // const { authUser } = useAuthContext();
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser: ",currentUser)
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
            to={"/app/event-types"}
            className= "btn btn-outline btn-xl bg-[#333]"
          >
            <span className="text-[#ddd]">GET STARTED</span>
          </Link>

          <p className="text-white text-xl mt-2">
            Welcome back, {currentUser.displayName}!{" "}
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

      )}
    </div>
  );
}

export default Banner;
