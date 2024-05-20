import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/images/auth-background.jpg"
// import "./styles/Login.css";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in with:", { emailOrUsername, password });
    setEmailOrUsername("");
    setPassword("");
  };

  return (
    <div className="text-[#333] bg-[#333] h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="bg-gradient-to-r from-white to-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-2 text-center">Welcome back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block font-bold mb-2">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              className="input input-bordered w-full bg-gray-300"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full bg-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            onClick={handleLogin}
            className="btn w-full btn-outline bg-[#222]"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center">Or login with</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button className="btn btn-outline bg-[#222] w-[48%]">
            <span className="fab fa-google mr-2"></span>
            Google
          </button>
          <button className="btn btn-outline bg-[#222] w-[48%]">
            <span className="fab fa-facebook mr-2"></span>
            Facebook
          </button>
        </div>
        <Link to="/signup" className="flex justify-center text-center mt-4 text-[#333]">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
