import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";

export default function AdminDashboard() {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { token } = useContext(CurrentUserContext);

  const body = JSON.stringify({ is_admin: isAdmin });

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const PUTrequestOptions = {
    method: "PUT",
    headers: myHeaders,
    body,
  };
  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const changeUserStatus = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, PUTrequestOptions);
  };
  const deleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, DELETErequestOptions);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((users) => setUserList(users));
  });

  return (
    <div>
      <div>
        <table>
          <h3>Liste Utilisateurs</h3>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Administrateur</th>
          </tr>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={user.is_admin ? "admin" : "user"}
                    type="button"
                    onClick={() => {
                      setIsAdmin(!isAdmin);
                      changeUserStatus(user.id);
                    }}
                  >
                    {user.is_admin ? "Admin" : "Utilisateur"}
                  </button>
                </td>
                <td>
                  {!user.is_admin ? (
                    <button
                      type="button"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      X
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <button type="button" onClick={() => console.warn(userList)}>
        test
      </button>
    </div>
  );
}
