import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import loginImg from "../asset/image/loginImg.jpeg";
import logo from "../asset/image/logo.svg";

function Register() {
  const [userRegistered, setUserRegistered] = useState({
    email: "default@email.com",
    firstname: "default",
    lastname: "default",
    password: "default",
  });

  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(userRegistered);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    // on créé et on redirige
    fetch("http://localhost:5000/api/register", requestOptions)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <img className="loginImg" src={loginImg} alt="loginImg" />
      </div>
      <div className="loginLogoContainer">
        <img className="loginLogo" src={logo} alt="logo" />
      </div>
      <form className="formContainer" onSubmit={handleForm}>
        <div className="inputContainer">
          <label htmlFor="firstname" className="form-label">
            Prénom
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({
                ...userRegistered,
                firstname: e.target.value,
              })
            }
            type="firstname"
            className="loginInput"
            id="firstname"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="lastname" className="form-label">
            Nom
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, lastname: e.target.value })
            }
            type="lastname"
            className="loginInput"
            id="lastname"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, email: e.target.value })
            }
            type="email"
            className="loginInput"
            id="email"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, password: e.target.value })
            }
            type="password"
            className="loginInput"
            id="password"
          />
        </div>
        <button className="loginButton" type="submit">
          Inscription
        </button>
      </form>
      <div className="returnContainer">
        <Link to="/login">
          <button type="button" className="returnButton">
            Retour
          </button>
        </Link>
      </div>{" "}
      <Navbar />
    </div>
  );
}

export default Register;
