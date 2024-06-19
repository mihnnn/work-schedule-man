import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/auth-hooks/useLogin";
// import "./styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username,password)
  };

  return (
    <div className="text-[#eee] h-screen flex items-center justify-center">
      <div className="p-4 mg h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 border border-gray-100 max-w-md">
        <h2 className="text-2xl mb-2 text-center">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <button type="submit" className="btn w-full btn-outline bg-[#222]" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
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
        <Link to="/signup" className="flex justify-center text-center mt-4 text-[#eee]">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
