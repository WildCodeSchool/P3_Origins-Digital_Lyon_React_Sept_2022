import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../asset/image/logo.svg";

function Register() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [userRegistered, setUserRegistered] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();

    if (confirmPassword === userRegistered.password) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify(userRegistered);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      fetch(`${BACKEND_URL}/api/register`, requestOptions)
        .then(async (response) => {
          if (response.status === 422) {
            const data = await response.json();
            console.warn(data);
          }
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.warn(error.response.status);
          }
        });
    } else {
      setErrorMessage("Les champs mot de passe ne sont pas identique");
    }
  };

  return (
    <div>
      <div className="headPage">
        <div className="loginLogoContainer">
          <img className="loginLogo" src={logo} alt="logo" />
        </div>
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
            required
            minLength={2}
            maxLength={100}
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
            className="loginInput"
            id="lastname"
            required
            minLength={2}
            maxLength={100}
            name="lastname"
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
            required
            minLength={2}
            maxLength={100}
            title='Veuillez entrer une adresse mail valide. Exemple: "exemple@mail.fr'
            id="email"
            name="email"
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
            required
            minLength={8}
            maxLength={100}
            id="password"
            name="password"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="form-label">
            Confirmer votre mot de passe
          </label>
          <input
            type="password"
            className="loginInput"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            maxLength={100}
            id="passxord"
            name="passxord"
          />
        </div>
        <p className="error-message">{errorMessage}</p>
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
