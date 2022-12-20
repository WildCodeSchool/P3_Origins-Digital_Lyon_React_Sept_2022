import React from "react";
import logo from "../asset/image/logo.svg";
import loginImg from "../asset/image/loginImg.jpeg";

function Register() {
  return (
    <div className="formContainer">
      <div>
        <img className="loginImg" src={loginImg} alt="loginImg" />
      </div>
      <div className="registerLogoContainer">
        <img className="registerLogo" src={logo} alt="logo" />
      </div>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <input
              className="form__input"
              type="text"
              id="firstName"
              placeholder="Prénom"
            />
          </div>
          <div className="lastname">
            <input
              type="text"
              name=""
              id="lastName"
              className="form__input"
              placeholder="Nom"
            />
          </div>
          <div className="email">
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder="Email"
            />
          </div>
          <div className="password">
            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Mot de passe"
            />
          </div>
          <div className="confirm-password">
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Confirmer mot de passe"
            />
          </div>
        </div>
        <div className="footer">
          <button type="submit">S'enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
