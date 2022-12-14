import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaRegBookmark, FaSearch, FaHome } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navContainer">
      <ul className="linkList">
        <Link className="link" to="/">
          <FaHome className="icons" />
        </Link>
        <Link className="link" to="/search">
          <FaSearch className="icons" />
        </Link>
        <Link className="link" to="/saved">
          <FaRegBookmark className="icons" />
        </Link>
        <Link className="link" to="/login">
          <FaUserCircle className="icons" />
        </Link>
      </ul>
    </div>
  );
}
