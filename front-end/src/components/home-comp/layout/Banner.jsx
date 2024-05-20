import React from "react";
import { Button } from "../../common/Button";
import { Link } from "react-router-dom";
import homeVideo from '../../../assets/videos/home-video.mp4'
import "../../styles/Banner.css"
import "../../styles/App.css"

function Banner() {
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center shadow-inner bg-black bg-opacity-50">
      <video className="object-cover w-full h-full fixed -z-10" src={homeVideo} autoPlay loop muted>
        {" "}
      </video>
      <h1 className="text-center text-white text-9xl mt-[-100px] md:text-5xl sm:text-4xl ">WSM for everyone</h1>
      <p className="mb-5 text-white text-2xl mt-4">Scheduler for everyone, focus on meetings, not making them</p>
      <div className="banner-btns-container">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          to="/signup"
        >
          GET STARTED
        </Button>

        <p className="prompt-login-msg">
          Already have an account? {" "}
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "#fff" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Banner;
