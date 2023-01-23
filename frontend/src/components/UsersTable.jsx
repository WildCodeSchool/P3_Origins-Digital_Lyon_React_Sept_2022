import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "./Navbar";
import ReturnPageButton from "./ReturnPageButton";

export default function UsersTable() {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const body = JSON.stringify({ is_admin: isAdmin });

  // Request options pour la mise à jour de la bdd

  const PUTrequestOptions = {
    method: "PUT",
    headers: myHeaders,
    body,
  };
  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  // fonction qui met à jour le status de l'utilisateur avec les PUT options ci-dessus
  const changeUserStatus = (id) => {
    setIsAdmin(!isAdmin);
    fetch(`http://localhost:5000/api/users/${id}`, PUTrequestOptions).then(
      (res) => {
        if (res) {
          fetch("http://localhost:5000/api/users")
            .then((response) => response.json())
            .then((user) => setUserList(user));
        }
      }
    );
  };
  const deleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, DELETErequestOptions).then(
      (res) => {
        if (res) {
          fetch("http://localhost:5000/api/users")
            .then((response) => response.json())
            .then((user) => setUserList(user));
        }
      }
    );
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((users) => {
        setUserList(users);
      });
  }, []);
  return (
    <div className="user-table-container">
      <ReturnPageButton />
      <h3>Liste Utilisateurs</h3>
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

      <input
        className="search-user"
        type="text"
        placeholder="Rechercher un utilisateur"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
                        changeUserStatus(user.id);
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
                    ) : null}
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
                          setIsAdmin(!isAdmin);
                          changeUserStatus(user.id);
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
                      ) : null}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}
