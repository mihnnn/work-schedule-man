import React, { useState } from "react";
import { Button } from "../common/Button"
import "./styles/SignUp.css"
import useSignup from "../../hooks/useSignup";

function SignUp() {
  // const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);
  const [tosChecked, setTosChecked] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [displayname, setDisplayname] = useState("");

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    username: "",
    password: "",
    confirmPassword: "",

  })

  const { loading, signup } = useSignup();

  // const handleClick = () => setClick(!click);

  const handleTosChange = () => { 
    setTosChecked(!tosChecked); // Toggle checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create your WSL account</h2>
        <p className="signup-msg">Sign up to start scheduling your meetings</p>

        {/* Sign up Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              value={inputs.displayName}
              onChange={(e) => setInputs({...inputs, displayName: e.target.value})}
              required
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
              required
              autoComplete="on"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
              required
            />
          </div>
        </form>

        {/* Sign up button */}
        <ul className="signup-requirements">
          <li>Must be at least 8 characters long</li>
          <li>Must contain at least one uppercase letter</li>
          <li>Must contain at least one number</li>
        </ul>

        {/* Ask for TOS and cookie consent */}
        <div className="tos-cookie-consent">
          <input type="checkbox" id="tos" name="tos" value="tos" checked={tosChecked} onChange={handleTosChange} />
          <label htmlFor="tos">
            I agree to the <a href="/tos">Terms of Service</a> and{" "}
            <a href="/cookies">Cookie Policy</a>
          </label>
        </div>

        <Button
          className="m-top-16" 
          buttonStyle="btn--auth"
          buttonSize="btn--auth-large"
          disabled={!tosChecked}
        >
          SIGN UP
        </Button>
        <p className="m-top-20">Or continue with</p>
        <div className="social-media-btn-box">
          <Button buttonStyle="btn--auth" buttonSize="btn--auth-medium">
            <span className="fab fa-google"></span>
            Google
          </Button>
          <Button buttonStyle="btn--auth" buttonSize="btn--auth-medium">
            <span className="fab fa-facebook"></span>
            Facebook
          </Button>
        </div>

        {/* Sign up link */}
        <p className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
