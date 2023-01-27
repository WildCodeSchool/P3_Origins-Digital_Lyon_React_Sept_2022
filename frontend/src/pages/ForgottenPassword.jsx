import React, { useState } from "react";

const { VITE_BACKEND_URL } = import.meta.env;

function ForgottenPassword() {
  /* Toast */

  /* set email */
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    /* It's an object that will be sent in the body of request */
    const body = JSON.stringify({
      email,
    });

    /* When the user enter his email adress, we will begin all the middleware of the route /forgottenpassword */
    fetch(`${VITE_BACKEND_URL}/api/forgottenpassword`, {
      method: "POST",
      redirect: "follow",
      body,
      headers: myHeaders,
    })
      .then(() => {})
      .catch((error) => console.warn(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Mot de passe oublié ?
        <span>
          <p>Entrez votre adresse mail de connexion</p>
        </span>
      </h2>
      <div>
        <div>
          <label htmlFor="email" name="email">
            Email
          </label>
          <input
            type="email"
            pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
            placeholder="Entrez votre addresse email"
            required
            value={email}
            onChange={handleChangeEmail}
            id="email"
            name="email"
          />
        </div>
      </div>
      {/* onClick : send email to the adress mail entered. */}
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default ForgottenPassword;
