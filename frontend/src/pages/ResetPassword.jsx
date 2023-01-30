import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReturnPageButton from "../components/ReturnPageButton";

function ResetPassword() {
  /* Toast */
  const navigate = useNavigate();

  const { VITE_BACKEND_URL } = import.meta.env;

  /* I recup passwordToken from the URL */
  const { passwordToken } = useParams();

  const checkValidToken = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    /* It's an object that will be sent in the body of request */
    const body = JSON.stringify({
      passwordToken,
    });
    fetch(`${VITE_BACKEND_URL}/api/passwordReset`, {
      method: "POST",
      redirect: "follow",
      body,
      headers: myHeaders,
    })
      .then((response) => {
        console.warn("checkValidToken", response);
        if (response.status !== 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    checkValidToken();
  }, []);

  /* set password */
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const verifyPassword = (e) => {
    setPasswordVerification(e.target.value);
  };

  /* When I submit, I verify first if the two password are the same. If no, I don't accept to change the password, if yes, the fetch can be launched. */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordVerification !== password);
    else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      /* It's an object that will be sent in the body of request */
      const body = JSON.stringify({
        password,
        passwordToken,
      });

      /* function push user and token in the localstorage */
      fetch(`${VITE_BACKEND_URL}/api/resetpassword`, {
        method: "POST",
        redirect: "follow",
        body,
        headers: myHeaders,
      })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => console.warn(error));
    }
  };

  return (
    <>
      <ReturnPageButton />
      <form onSubmit={handleSubmit} className="forgot-password-container">
        <h2>Modifier votre mot de passe</h2>

        {/* label and input */}

        <label htmlFor="email" name="email">
          Mot de passe
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={handleChangePassword}
          id="password"
          name="password"
          placeholder="Entrez votre nouveau mot de passe"
        />

        <label htmlFor="password" name="password">
          Confirmez le mot de passe
        </label>

        <input
          type="password"
          required
          value={passwordVerification}
          onChange={verifyPassword}
          id="passwordCheck"
          name="passwordCheck"
          placeholder="Confirmer votre nouveau mot de passe"
        />

        <button type="submit">Sauvegarder</button>
      </form>
    </>
  );
}

export default ResetPassword;
