import React from "react";
import logo from "../asset/image/digital.png";

function Header() {
  return (
    <div className="header-container">
      <img className="container-logo" src={logo} alt="logo" />
      <div className="arrow" />
    </div>
  );
}

export default Header;
