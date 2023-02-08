import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/userContext";
import loginImg from "../asset/image/loginImg.jpeg";
import logo from "../asset/image/logo.svg";

function Login() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const loginToast = () =>
    toast.success("Vous êtes connecté !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const { setUser, setToken } = useCurrentUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      // on appelle le back
      fetch(`${BACKEND_URL}/api/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUser(result.user);
          setToken(result.token);
          navigate("/");
        })
        .catch(console.error);
    } else {
      setErrorMessage("Please specify email and password");
    }
  };

  return (
    <>
      <div>
        <img className="loginImg" src={loginImg} alt="loginImg" />
      </div>
      <div className="loginLogoContainer">
        <img className="loginLogo" src={logo} alt="logo" />
      </div>
      <h2 className="loginTitle">Connectez-vous</h2>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="loginInput"
            id="email"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="loginInput"
            id="password"
            required
            minLength={4}
            maxLength={100}
          />
        </div>
        <button className="loginButton" type="submit" onClick={loginToast}>
          Connexion
        </button>
        {errorMessage !== "" ? <div>{errorMessage}</div> : ""}
      </form>
      <div className="registerContainer">
        <h3 className="noAccountTitle">Vous n'avez pas de compte ?</h3>
        <Link to="/register">
          <button type="button" className="registerButton">
            S'inscrire
          </button>
        </Link>
        <Link to="/forgotPassword">
          <button type="button" className="registerButton">
            Mot de passe oubliée ?
          </button>
        </Link>
      </div>
    </>
  );
}

export default Login;
