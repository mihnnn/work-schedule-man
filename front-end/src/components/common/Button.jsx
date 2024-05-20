//Reusable button accross the website
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css"

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
        className={`btn ${className} ${checkButtonStyle} ${checkButtonSize} ${disabled ? "disabled" : "enabled"}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
};
