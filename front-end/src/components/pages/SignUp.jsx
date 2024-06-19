import React, { useState } from "react";
import useSignup from "../../hooks/auth-hooks/useSignup";

function SignUp() {
  const [tosChecked, setTosChecked] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleTosChange = () => {
    setTosChecked(!tosChecked); // Toggle checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="text-[#eee] h-screen flex items justify-center " >
      <div className="p-4 mg h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 border border-gray-100 max-w-max">
        <h2 className="text-2xl mb-2 text-center">Create your WSL account</h2>
        <p className="text-center mb-4 text-xl">Sign up to start scheduling your meetings</p>

        {/* Sign up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}

            />
          </div>
          <div className="form-group flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="displayName" className="block font-bold mb-2">Display Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-300 text-[#222]"
                value={inputs.displayName}
                onChange={(e) => setInputs({ ...inputs, displayName: e.target.value })}
  
                autoComplete="on"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="username" className="block font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                className="input input-bordered w-full bg-gray-300 text-[#222]"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
  
                autoComplete="on"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}

            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input input-bordered w-full bg-gray-300 text-[#222]"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}

            />
          </div>
          {/* Password Requirements */}
          <ul className="list-disc list-inside mt-4 mb-4 text-[#eee]">
            <li>Must be at least 8 characters long</li>
            <li>Must contain at least one uppercase letter</li>
            <li>Must contain at least one number</li>
          </ul>

          {/* TOS and Cookie Consent */}
          <div className="mt-4 flex items-center ">
            <input
              type="checkbox"
              id="tos"
              name="tos"
              className="checkbox bg-[#ccc]" 
              checked={tosChecked}
              onChange={handleTosChange}
            />
            <label htmlFor="tos" className="ml-2">
              I agree to the <a href="/tos" className="underline">Terms of Service</a> and{" "}
              <a href="/cookies" className="underline">Cookie Policy</a>
            </label>
          </div>
          <button
            type="submit"
            className="btn w-full mb-4 btn-outline bg-[#222]"
            disabled={!tosChecked || loading}
            cursor={!tosChecked || loading ? "not-allowed" : "pointer"}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </button>
        </form>


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



        {/* Sign up link */}
        <p className="text-center mt-4 text-[#ccc]">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
