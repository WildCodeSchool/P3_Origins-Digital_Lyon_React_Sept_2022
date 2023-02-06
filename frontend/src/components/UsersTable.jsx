import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "./Navbar";
import ReturnPageButton from "./ReturnPageButton";

export default function UsersTable() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [getUserId, setGetUserId] = useState(0);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const filterOption = searchOption || "firstname";
  const filterFunctions = {
    firstname: (user) => user.firstname.toLowerCase().includes(search),
    lastname: (user) => user.lastname.toLowerCase().includes(search),
    email: (user) => user.email.toLowerCase().includes(search),
    id: (user) => user.id.toString().includes(search),
  };

  const { token } = useContext(CurrentUserContext);

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  // Request options pour la mise à jour de la bdd

  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  // fonction qui met à jour le status de l'utilisateur avec les PUT options ci-dessus
  const updateUsetStatus = (user) => {
    axios
      .put(
        `${BACKEND_URL}/api/users/${user.id}`,
        {
          is_admin: !user.is_admin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res) {
          axios
            .get(`${BACKEND_URL}/api/users`)
            .then((users) => setUserList(users.data));
        }
      });
  };
  const deleteUser = (id) => {
    fetch(`${BACKEND_URL}/api/users/${id}`, DELETErequestOptions).then(
      (res) => {
        if (res) {
          fetch(`${BACKEND_URL}/api/users`)
            .then((response) => response.json())
            .then((user) => setUserList(user));
        }
      }
    );
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/users`)
      .then((res) => res.json())
      .then((users) => {
        setUserList(users);
      });
  }, []);
  return (
    <div className="user-table-container">
      <ReturnPageButton />
      <h3>Liste Utilisateurs</h3>
      <input
        className="search-user"
        type="text"
        placeholder="Rechercher un utilisateur"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="select-input">
        <label htmlFor="search-option" className="form-label">
          Rechercher par :
        </label>
        <select
          onChange={(e) => setSearchOption(e.target.value)}
          id="search-option"
        >
          <option value="firstname">firstname</option>
          <option value="lastname">lastname</option>
          <option value="email">email</option>
          <option value="id">id</option>
        </select>
      </div>

      {search !== "" ? (
        <div className="user-table">
          {userList
            .filter(filterFunctions[filterOption])

            .map((user) => (
              <div className="user-list" key={user.id}>
                <ul className="user-info">
                  <li>{user.firstname}</li>
                  <li>{user.lastname}</li>
                  <li>{user.email}</li>
                </ul>
                <ul className="user-manage">
                  <li>#{user.id}</li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        updateUsetStatus(user);
                      }}
                    >
                      {user.is_admin ? "Admin" : "Utilisateur"}
                    </button>
                  </li>
                  <li>
                    {!user.is_admin ? (
                      <button
                        type="button"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        Supprimer
                      </button>
                    ) : (
                      <button type="button">Supprimer</button>
                    )}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="user-table">
          <div>
            {userList.map((user) => {
              return (
                <div className="user-list" key={user.id}>
                  <ul className="user-info" key={user.id}>
                    <li>{user.firstname}</li>
                    <li>{user.lastname}</li>
                    <li>{user.email}</li>
                  </ul>
                  <ul className="user-manage">
                    <li>#{user.id}</li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          updateUsetStatus(user);
                        }}
                      >
                        {user.is_admin ? "Admin" : "Utilisateur"}
                      </button>
                    </li>
                    <li>
                      {!user.is_admin ? (
                        <button
                          type="button"
                          onClick={() => {
                            openModal();
                            setGetUserId(user.id);
                          }}
                        >
                          Supprimer
                        </button>
                      ) : (
                        <button type="button" className="not-delete-btn">
                          Supprimer
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Navbar />
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Modal"
        style={{
          content: {
            height: "auto",
            bottom: "auto",
            width: "80vw",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
        <div className="modal-buttons">
          <button type="button" onClick={closeModal} className="close_btn">
            Fermer
          </button>
          <button
            className="delete_btn"
            type="button"
            onClick={() => {
              deleteUser(getUserId);
              closeModal();
            }}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
