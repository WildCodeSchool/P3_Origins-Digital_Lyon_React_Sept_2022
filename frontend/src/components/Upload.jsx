import React, { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../contexts/userContext";

function Upload() {
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [msg, setMsg] = useState("");

  const videoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoRef.current.files[0]) {
      // recupération des articles.
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("video", videoRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };
      // on appelle le back
      fetch("http://localhost:5000/api/videos", requestOptions)
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
          <img
            src={`http://localhost:5000/api/videos/${user.video}`}
            alt="video"
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
