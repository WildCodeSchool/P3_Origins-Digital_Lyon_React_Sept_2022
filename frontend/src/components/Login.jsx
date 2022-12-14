/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import loginImg from "../asset/image/loginImg.jpeg";
import logo from "../asset/image/logo.svg";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div className="loginContainer">
      <div>
        <img className="loginImg" src={loginImg} alt="loginImg" />
      </div>
      <img className="loginLogo" src={logo} alt="logo" />
      <div className="inputContainer">
        <h2 className="loginTitle">Login</h2>
        <label htmlFor="input">Username</label>
        <input
          className="loginInput"
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <label htmlFor="input">Password</label>
        <input
          className="loginInput"
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
        />
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
