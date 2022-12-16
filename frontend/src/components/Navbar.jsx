import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaRegBookmark, FaSearch, FaHome } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navContainer">
      <ul className="linkList">
        <NavLink className="link" to="/">
          <FaHome className="icons" />
        </NavLink>
        <NavLink className="link" to="/search">
          <FaSearch className="icons" />
        </NavLink>
        <NavLink className="link" to="/saved">
          <FaRegBookmark className="icons" />
        </NavLink>
        <NavLink className="link" to="/login">
          <FaUserCircle className="icons" />
        </NavLink>
      </ul>
    </div>
  );
}
