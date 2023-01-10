import React, { useContext, useRef, useState } from "react";
import { Player } from "video-react";

import axios from "axios";
import CurrentUserContext from "../../contexts/userContext";

function Upload() {
  const { token } = useContext(CurrentUserContext);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [img, setimg] = useState("");

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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      name,
      description,
      img,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    e.preventDefault();
    // on créé et on redirige
    fetch("http://localhost:5000/api/videos", requestOptions)
      .then(() => {
        console.warn("sql maj");
      })
      .catch(console.error);
  };

  return (
    <div className="profil-container">
      <div className="video-container">
        <div className="video">
          <Player playsInline src="http://localhost:5000/api/videos/" />
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
              <input
                type="text"
                id="img"
                onChange={(e) => setimg(e.target.value)}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input
                type="text"
                id="description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
