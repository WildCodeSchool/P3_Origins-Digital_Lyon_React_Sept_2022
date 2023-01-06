import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Player } from "video-react";
import CurrentUserContext from "../../contexts/userContext";

function Upload() {
  const { user, setUser, token } = useContext(CurrentUserContext);

  const [msg, setMsg] = useState("");

  const videoRef = useRef(null);

  const handleSubmit = (e) => {
    console.warn(user);
    e.preventDefault();
    if (videoRef.current.files[0]) {
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("video", videoRef.current.files[0]);

      // on appelle le back
      axios
        .post("http://localhost:5000/api/videos")
        .then((response) => response.json())
        .then((results) => {
          // maj video
          setUser({ ...user, video: results.video });
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
          <Player
            playsInline
            src={`http://localhost:5000/api/videos/${user.video}`}
          />
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="file" className="form-label">
              Choisir
            </label>
            <input type="file" ref={videoRef} id="file" />
            <button type="submit">Envoyer</button>
            <p>{msg}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
