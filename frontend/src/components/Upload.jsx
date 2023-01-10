import React, { useContext, useRef, useState } from "react";
import { Player } from "video-react";

import axios from "axios";
import CurrentUserContext from "../../contexts/userContext";

function Upload() {
  const { token } = useContext(CurrentUserContext);

  const [msg, setMsg] = useState("");

  const videoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoRef.current.files[0]) {
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("videos", videoRef.current.files[0]);

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

  return (
    <div className="profil-container">
      <div className="video-container">
        <div className="video">
          <Player playsInline src="" />
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
