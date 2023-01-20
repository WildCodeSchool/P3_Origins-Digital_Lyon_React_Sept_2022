import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";

export default function UsersTable() {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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
    fetch(`http://localhost:5000/api/users/${id}`, PUTrequestOptions);
  };
  const deleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, DELETErequestOptions);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((users) => {
        setUserList(users);
      });
  }, []);
  return (
    <div>
      <ReturnPageButton />
      <h3>Liste Utilisateurs</h3>
      <div className="user-table">
        <div>
          {userList.map((user) => {
            return (
              <div className="user-list">
                <ul key={user.id} className="user-info">
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
    </div>
  );
}
