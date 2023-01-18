import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";

export default function UsersTable() {
  const [videosList, setVideosList] = useState([]);
  const { token } = useContext(CurrentUserContext);

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const deleteVideos = (id) => {
    fetch(`http://localhost:5000/api/videos/${id}`, DELETErequestOptions);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((videos) => setVideosList(videos));
  }, [videosList]);
  return (
    <div>
      <ReturnPageButton />
      <h3>Liste Vidéos</h3>
      <table>
        <tr>
          <th>Vidéos</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Supprimer</th>
        </tr>
        {videosList.map((videos) => {
          return (
            <tr key={videos.id}>
              <td>{videos.name}</td>
              <td>{videos.description}</td>
              <td>
                <button
                  className="delete"
                  type="button"
                  onClick={() => {
                    deleteVideos(videos.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
