import React from "react";
import ReturnPageButton from "../components/ReturnPageButton";
import loginImg from "../asset/image/loginImg.jpeg";
import pdp from "../asset/image/pdp.jpg";

export default function UserSettings() {
  return (
    <div className="UserSettingPage">
      <ReturnPageButton />
      <img className="banner" src={loginImg} alt="banner" />
      <div className="pdpContainer">
        <img className="pdp" src={pdp} alt="profilePic" />
      </div>
    </div>
  );
}
