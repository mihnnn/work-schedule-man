import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";
import "../styles/Navbar.css";

function Navbar() {
  //useState hooks
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
    return () => {
      window.removeEventListener("resize", showButton);
    }
  }, []);

  window.addEventListener("resize", showButton);

   // Check if the current location is the sign-up page
   const isSignUpPage = location.pathname === "/signup";
   const isLoginPage = location.pathname === "/login";

   // Render the navbar only if it's not the sign-up page
   if (isSignUpPage || isLoginPage) {
     return null;
   }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            WSM <i className="fas fa-user-clock pad-left-8"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/event-types"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                EVENTS
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/booking"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                BOOKING
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {" "}
                Sign Up{" "}
              </Link>
            </li> 
          </ul>
          {button && <Button to='/signup' buttonStyle="btn--outline"> SIGN UP </Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
