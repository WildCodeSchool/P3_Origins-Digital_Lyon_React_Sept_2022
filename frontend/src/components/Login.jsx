/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginImg from "../asset/image/loginImg.jpeg";
import logo from "../asset/image/logo.svg";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [hidden, setHidden] = useState(true);

  const handleShow = () => setHidden(!hidden);

  return (
    <div className="loginContainer">
      <div>
        <img className="loginImg" src={loginImg} alt="loginImg" />
      </div>
      <div className="loginLogoContainer">
        <img className="loginLogo" src={logo} alt="logo" />
      </div>
      <h2 className="loginTitle">Login</h2>
      <div className="formContainer">
        <div className="inputContainer">
          <label htmlFor="input">Username or email</label>
          <input
            className="loginInput"
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username\email"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="input">Password</label>
          <div className="passwordContainer">
            <input
              className="loginInput"
              onChange={(e) => setUserPassword(e.target.value)}
              type={hidden ? "password" : "text"}
            />
            <div className="eyeContainer">
              {hidden ? (
                <BiHide className="eyes" onClick={handleShow} />
              ) : (
                <BiShow className="eyes" onClick={handleShow} />
              )}
            </div>
          </div>
        </div>
        <div className="loginButtonContainer">
          <button
            type="button"
            onClick={() => {
              console.log(userName);
              console.log(userPassword);
            }}
            className="loginButton"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
