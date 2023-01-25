import React, { useContext, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";
import defaultAvatar from "../asset/image/defaultAvatar.jpeg";
import Imglog from "../asset/image/img1.png";

function Profil() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");
  const [modifyInfos, setModifyInfos] = useState(false);

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

  const saveInfosChangeToast = () =>
    toast.info("Modifications enregistrées !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Nouvelles infos modifiés par le user
  const [newUserInfos, setNewUserInfos] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });

  const body = JSON.stringify(newUserInfos);

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const PUTrequestOptions = {
    method: "PUT",
    headers: myHeaders,
    body,
  };

  const changeUserStatus = (id) => {
    fetch(`${BACKEND_URL}/api/users/${id}`, PUTrequestOptions);
    setUser({
      ...user,
      firstname: newUserInfos.firstname,
      lastname: newUserInfos.lastname,
      email: newUserInfos.email,
    });
  };

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
      fetch(`${BACKEND_URL}/api/avatars`, requestOptions)
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
      <div>
        <img className="container-img" src={Imglog} alt="img" />
      </div>
      <div className="avatar-container">
        <div className="avatar">
          <img
            src={`${BACKEND_URL}/api/avatars/${user.avatar}`}
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
        <p className="containerName">
          {user.firstname} {user.lastname}
        </p>
        {modifyInfos ? (
          <button
            type="button"
            onClick={() => {
              setModifyInfos(false);
              changeUserStatus(user.id);
              saveInfosChangeToast();
            }}
          >
            Enregistrer
          </button>
        ) : (
          <button
            className="containerbtn-profil"
            type="button"
            onClick={() => {
              setModifyInfos(true);
            }}
          >
            Modifier mes informations
          </button>
        )}

        {modifyInfos ? (
          <ul>
            <li>
              <label htmlFor="mail" name="email">
                Nom
              </label>
              <input
                className="container-input"
                type="text"
                onChange={(e) =>
                  setNewUserInfos({
                    ...newUserInfos,
                    lastname: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <label htmlFor="mail" name="email">
                Prénom
              </label>
              <input
                className="container-input"
                type="text"
                onChange={(e) =>
                  setNewUserInfos({
                    ...newUserInfos,
                    firstname: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <label htmlFor="mail" name="email">
                Email
              </label>
              <input
                className="container-input"
                type="text"
                onChange={(e) =>
                  setNewUserInfos({
                    ...newUserInfos,
                    email: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        ) : (
          <ul className="containerul">
            <li>{user.lastname}</li>
            <li>{user.firstname}</li>
            <li>{user.email}</li>
          </ul>
        )}
        {user.is_admin === 1 ? (
          <div>
            <button onClick={() => navigate("/upload")} type="button">
              Upload des videos
            </button>
            <button onClick={() => navigate("/videosManagement")} type="button">
              Gestion des videos
            </button>
          </div>
        ) : (
          ""
        )}
        {user.is_admin === 1 ? (
          <div>
            <button onClick={() => navigate("/addcategory")} type="button">
              Ajouter des Catégories
            </button>
            <button onClick={() => navigate("/videosManagement")} type="button">
              Gestion des videos
            </button>
          </div>
        ) : (
          ""
        )}
        {user.is_admin ? (
          <button type="button" onClick={() => navigate("/usersManagement")}>
            Gestion des Utilisateurs
          </button>
        ) : null}
        <button
          onClick={() => {
            handleDisconnection();
            unlogToast();
          }}
          type="button"
        >
          Se déconnecter
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profil;
