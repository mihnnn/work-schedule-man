import React, { useState } from "react";
import "./styles/Login.css";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Process form submission, e.g., send data to server
    console.log("Logged in with:", { emailOrUsername, password });
    // Reset form fields after submission
    setEmailOrUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            {/* TO DO: Integrate both email and username search */}
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) =>
                setEmailOrUsername(e.target.value)
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <Button 
          type="submit"
          onClick={handleLogin}
          buttonStyle="btn--auth"
          buttonSize="btn--auth-large"
        >
          {"Login"}
        </Button>

        <p className="m-top-20">Or login with</p>
        <div className="social-media-btn-box">
          {/* <button className="social-media-btn">
            <span className="fab fa-google"></span>
            Google
          </button> */}
          <Button 
            to="/"
            buttonStyle="btn--auth"
            buttonSize="btn--auth-medium"
          >
            <span className="fab fa-google"></span>
            Google
          </Button>

          <Button 
            to="/"
            buttonStyle="btn--auth"
            buttonSize="btn--auth-medium"
          >
            <span className="fab fa-facebook"></span>
            Facebook
          </Button>
        </div>
          <Link to="/signup" className="signup-link">
            Don't have an account?
          </Link>
      </div>
    </div>
  );
}

export default Login;
