import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";

function Upload() {
  const uploadToast = () =>
    toast.success("Upload réussi !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadFailedToast = () =>
    toast.error("Upload échoué !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadNoFileToast = () =>
    toast.warn("Pas de fichiers à Uploader !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const { token } = useContext(CurrentUserContext);
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
          uploadToast();
        })
        .catch((error) => {
          console.error(error);
          uploadFailedToast();
        });
    } else {
      uploadNoFileToast();
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
      <ToastContainer />
    </div>
  );
}

export default Upload;
