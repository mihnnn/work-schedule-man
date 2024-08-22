import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useLogin from "../../hooks/local-auth-hooks/useLogin";
import { loginLoad, loginSuccess, loginFail } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import GoogleOAuth from "../home-comp/auth/GoolgeOAuth";
 

function Login() {

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  // const [googleLoading, setGoogleLoading] = useState(false);

  // const { loading, login, googleLogin } = useLogin();
  console.log("loading: ", loading);
  console.log("error: ", errorMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(loginFail("All fields are required"));
    }
    console.log("Posting to backend: ", formData);
    try {
      dispatch(loginLoad());
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("backend res: ", data);
      if (data.error) {
        dispatch(loginFail(data.error));
      } else {
        dispatch(loginSuccess(data));
        navigate('/');
        toast.success("Logged in successfully");
      }
      
      
    } catch (error) {
      dispatch(loginFail(error));
    }
  };

  // const handleGoogleLogin = () => {
  //   setGoogleLoading(true);
  //   googleLogin();
  // }

  return (
    <div className="text-[#eee] h-screen flex items-center justify-center">
      <div className="p-4 mg h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 border border-gray-100 max-w-md">
        <h2 className="text-2xl mb-2 text-center">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn w-full btn-outline bg-[#222]" disabled={loading}>
            {loading ? (
              <span className="fas fa-spinner fa-spin"></span>
            ) : (
              "Login"
            )}
          </button>
          {errorMessage && (
            <div role="alert" className=" my-3 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
        <p className="mt-5 text-center">Or login with</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          {/* <button 
            className="btn btn-outline bg-[#222] w-[48%]"
            // disabled={googleLoading}
          >
              <>
                <span className="fab fa-google mr-2"></span>
                Google
              </>
            
          </button> */}
          <GoogleOAuth />
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
