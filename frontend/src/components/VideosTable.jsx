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
  }, []);
  return (
    <div>
      <ReturnPageButton />
      <h3>Liste Vidéos</h3>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Supprimer</th>
          </tr>
          {videosList.map((video) => {
            return (
              <tr key={video.id}>
                <td>{video.id}</td>
                <td>{video.name}</td>
                <td>
                  <button
                    type="button"
                    className="admin"
                    onClick={() => {
                      deleteVideos(video.id);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
