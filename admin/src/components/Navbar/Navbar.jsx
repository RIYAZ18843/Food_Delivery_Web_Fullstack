import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <span className="logo-text">Riyaz.</span>
      </Link>

      {/* <img
        className="profile"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
      /> */}
    </div>
  );
};

export default Navbar;
