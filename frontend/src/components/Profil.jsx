import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";

function Profil() {
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("Aucun upload effectué");

  const handleDisconnection = () => {
    // gestion de la deconnexion
    localStorage.clear();
    setUser({});
    navigate("/");
  };

  const avatarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatarRef.current.files[0]) {
      // recupération des articles.
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };
      // on appelle le back
      fetch("http://localhost:5000/api/avatars", requestOptions)
        .then((response) => response.json())
        .then((results) => {
          // maj avatar
          setUser({ ...user, avatar: results.avatar });
          setMsg("Upload réussi !");
        })
        .catch((error) => {
          console.error(error);
          setMsg("Upload échoué !");
        });
    } else {
      setMsg(
        "Vous auriez pas oublié un truc ? Le fichier à uploader, par exemple ?"
      );
    }
  };
  return (
    <div className="profil-container">
      <div className="avatar-container">
        <div className="avatar">
          <img
            src={`http://localhost:5000/api/avatars/${user.avatar}`}
            alt="avatar"
          />
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input type="file" ref={avatarRef} />
          <button type="submit">Envoyer</button>
        </form>
        <p>{msg}</p>
      </div>
      <div className="profil-info">
        <p>
          {user.lastname[0]}.{user.firstname}
        </p>
        <ul>
          <li>Nom : {user.lastname}</li>
          <li>Prenom : {user.firstname}</li>
          <li>Email : {user.email}</li>
          <button onClick={handleDisconnection} type="button">
            Se déconnecter
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Profil;
