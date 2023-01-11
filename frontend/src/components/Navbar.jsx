import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/">
          <li className="home" />
        </NavLink>
        <NavLink to="/search">
          <li className="search" />
        </NavLink>
        <NavLink to="/saved">
          <li className="library" />
        </NavLink>
        <NavLink to="/login">
          <li className="profil" />
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
