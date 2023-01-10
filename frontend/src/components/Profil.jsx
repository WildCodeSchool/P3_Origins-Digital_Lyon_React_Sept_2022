import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";
import defaultAvatar from "../asset/image/defaultAvatar.jpeg";

function Profil() {
  const unlogToast = () =>
    toast.error("Vous êtes déconnecté !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");

  const handleOnError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

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
            onError={handleOnError}
          />
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="file" className="form-label">
              Cliquez ici pour changer l'avatar
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
          {user.is_admin === 1 ? (
            <div>
              <button type="button" onClick={() => navigate("/upload")}>
                Upload des video
              </button>
              <button
                type="button"
                onClick={() => navigate("/usersManagement")}
              >
                Gestion des Utilisateurs
              </button>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              handleDisconnection();
              unlogToast();
            }}
            type="button"
          >
            Se déconnecter
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Profil;
