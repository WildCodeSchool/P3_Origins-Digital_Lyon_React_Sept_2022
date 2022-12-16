import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li className="home" />
        </NavLink>
        <NavLink
          to="/search"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="search" />
        </NavLink>
        <NavLink
          to="/saved"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="library" />
        </NavLink>
        <NavLink
          to="/login"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="profil" />
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
