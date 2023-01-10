import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";

function Profil() {
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");
  const [modifyInfos, setModifyInfos] = useState(false);

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
    fetch(`http://localhost:5000/api/users/${id}`, PUTrequestOptions);
    setUser({
      ...user,
      firstname: newUserInfos.firstname,
      lastname: newUserInfos.lastname,
      email: newUserInfos.email,
    });
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
          {user.lastname}.{user.firstname}
        </p>

        {modifyInfos ? (
          <ul>
            <li>
              <label htmlFor="mail" name="email">
                Nom
              </label>
              <input
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
          <ul>
            <li>{user.lastname}</li>
            <li>{user.firstname}</li>
            <li>{user.email}</li>
          </ul>
        )}
        {user.is_admin === 1 ? (
          <NavLink to="/upload">
            <button type="button">Upload des videos</button>
          </NavLink>
        ) : (
          ""
        )}
        {modifyInfos ? (
          <button
            type="button"
            onClick={() => {
              setModifyInfos(false);
              changeUserStatus(user.id);
            }}
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setModifyInfos(true);
            }}
          >
            Modifier ses informations
          </button>
        )}
        {user.is_admin ? (
          <button type="button" onClick={() => navigate("/usersManagement")}>
            Gestion des Utilisateurs
          </button>
        ) : null}
        <button onClick={handleDisconnection} type="button">
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Profil;
