import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";

function Profil() {
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");

  const handleDisconnection = () => {
    console.warn(user);
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
      setMsg("Aucun fichier");
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
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="file" className="form-label">
              Choisir
            </label>
            <input type="file" ref={avatarRef} id="file" />
            <button type="submit">Envoyer</button>
            <p>{msg}</p>
          </form>
        </div>
      </div>
      <div className="profil-info">
        <p>
          {user.lastname[0]}.{user.firstname}
        </p>
        <ul>
          <li>Nom : {user.lastname}</li>
          <li>Prenom : {user.firstname}</li>
          <li>Email : {user.email}</li>
          {user.is_admin === 0 ? (
            <NavLink to="/upload">
              <button type="button">Upload des video</button>
            </NavLink>
          ) : (
            ""
          )}
          <button onClick={handleDisconnection} type="button">
            Se déconnecter
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Profil;
