import React, { useContext, useEffect, useRef, useState } from "react";
import { Player } from "video-react";

import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";
import CurrentUserContext from "../../contexts/userContext";

function Upload() {
  const { token } = useContext(CurrentUserContext);
  const { videos, setVideos } = useContext(CurrentVideosContext);
  const [msg, setMsg] = useState("");

  const videoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoRef.current.files[0]) {
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("videos", videoRef.current.files[0]);
      formData.append(
        "description",
        document.querySelector("#description").value
      );
      formData.append("img", document.querySelector("#img").value);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      // on appelle le back
      axios
        .post("http://localhost:5000/api/videos", formData)
        .then((response) => response.json())
        .then((results) => {
          // maj video
          console.warn(results);

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
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((response) => {
        setVideos(response.data);
        console.warn(response.data);
        // utiliser les données récupérées pour mettre à jour votre state ou afficher les vidéos dans votre composant
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <div className="profil-container">
      <div className="video-container">
        <div className="video">
          <div>
            {videos.map((video) => (
              <Player
                key={video.id}
                playsInline
                src={`http://localhost:5000/api/videos/${video.name}`}
              />
            ))}
          </div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="file" className="form-label">
              Choisir
            </label>
            <input type="file" ref={videoRef} id="file" />

            <p>{msg}</p>

            <div className="inputContainer">
              <label htmlFor="img" className="form-label">
                img
              </label>
              <input type="text" id="img" />
            </div>

            <div className="inputContainer">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input type="text" id="description" />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
