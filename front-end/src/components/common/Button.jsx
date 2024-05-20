//Reusable button accross the website
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css"


//diffrent styles and sizes for the button
const STYLES = ["btn--primary", "btn--outline", "btn--auth"];
const SIZES = ["btn--medium", "btn--large", "btn--auth-large", "btn--auth-medium"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to,
  className,
  disabled,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  // to="/sign-up" (saved to put next to Link)
  return (
    <Link 
      to={to}   
      className="btn-mobile"
    >
      <button
      // tailwind css styling
        className={`btn ${checkButtonStyle === 'auth' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'} ${checkButtonSize} ${disabled ? "opacity-90 cursor-not-allowed" : ""} ${className}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
};
