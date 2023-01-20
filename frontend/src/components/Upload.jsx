import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";

function Upload() {
  const { token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoRef.current.files[0] && imgRef.current.files[0]) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("video", videoRef.current.files[0]);
      formData.append("img", imgRef.current.files[0]);
      formData.append("description", description);
      formData.append("name", name);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      axios
        .post(`http://localhost:5000/api/videos`, formData, config)
        .then(() => {
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
      <ReturnPageButton />
      <div className="video-container">
        <h1>Upload Des Vidéos</h1>
        <div className="video">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="video" className="form-label">
              Choisir la vidéo
            </label>
            <input type="file" ref={videoRef} id="video" />

            <label htmlFor="img" className="form-label">
              Choisir l'image
            </label>
            <input type="file" ref={imgRef} id="img" />

            <p>{msg}</p>

            <div className="inputContainer">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="description"
              />
            </div>
            <button className="containerbtn" type="submit">
              Appliquer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
