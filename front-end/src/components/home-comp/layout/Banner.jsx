import React from "react";
import { Button } from "../../common/Button";
import { Link } from "react-router-dom";
import homeVideo from '../../../assets/videos/home-video.mp4'
import "../../styles/Banner.css"
import "../../styles/App.css"

function Banner() {
  return (
    <div className="banner-container">
      <video src={homeVideo} autoPlay loop muted>
        {" "}
      </video>
      <h1>WSM for everyone</h1>
      <p>Scheduler for everyone, focus on meetings, not making them</p>
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
