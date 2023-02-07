import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";
import Navbar from "./Navbar";

function Upload() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
  const [categoryId, setCategoryId] = useState([0]);
  const [categoryList, setCategoryList] = useState([]);
  const [promote, setPromote] = useState(1);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const [errorImg, setError] = useState(null);
  const [errorVideo, setErrorvideo] = useState(null);

  const validateImage = () => {
    const selectedImg = imgRef.current.files[0];
    if (selectedImg && selectedImg.size > 10000000) {
      setError("La taille du fichier est trop volumineux : Max:10Mo");
    } else if (
      selectedImg &&
      !["image/jpeg", "image/jpg", "image/png"].includes(selectedImg.type)
    ) {
      setError(
        "Format inccorect, seul les formats JPEG, JPG et PNG sont acceptée"
      );
    } else {
      setError(null);
    }
  };
  const validateVideo = () => {
    const selectedVideo = videoRef.current.files[0];
    if (selectedVideo && selectedVideo.size > 2000000000) {
      setErrorvideo("La taille du fichier est trop volumineux : Max 2G");
    } else if (
      selectedVideo &&
      !["video/mp4", "video/quicktime"].includes(selectedVideo.type)
    ) {
      setErrorvideo("Format inccorect, seul les formats Video sont acceptée");
    } else {
      setErrorvideo(null);
    }
  };

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
      formData.append("promote", promote);
      formData.append("category_id", categoryId);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      axios
        .post(`${BACKEND_URL}/api/videos`, formData, config)
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
    setName("");
    setDescription("");
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category`)
      .then((res) => setCategoryList(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="upload-container">
        <ReturnPageButton />
        <h2>
          <strong> Upload De Vidéo</strong>
        </h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group file-area">
            <label htmlFor="video" className="form-label">
              Vidéo
            </label>
            <input
              type="file"
              ref={videoRef}
              id="video"
              required="required"
              onChange={validateVideo}
            />
            <div className="file-dummy">
              {errorVideo !== null ? (
                <div style={{ color: "red" }}>{errorVideo}</div>
              ) : (
                <div className="success">
                  "Votre fichier a bien été sélectionnée"
                </div>
              )}
              <div className="default">Sélectionner une vidéo</div>
            </div>
          </div>
          <div className="form-group file-area">
            <label htmlFor="img" className="form-label">
              Image
            </label>
            <input
              type="file"
              ref={imgRef}
              id="img"
              required="required"
              onChange={validateImage}
            />
            <div className="file-dummy">
              {errorImg !== null ? (
                <div style={{ color: "red" }}>{errorImg}</div>
              ) : (
                <div className="success">
                  Votre fichier a bien été sélectionnée
                </div>
              )}
              <div className="default">Sélectionner une image</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom de la vidéo
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              title="Nom trop court"
              className="form-controll"
              required
              minLength={3}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Categorie de la vidéo
            </label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              id="category"
              className="form-controll "
              required
              minLength={3}
              maxLength={100}
            >
              <option>---------Selectionnez une catégorie----------</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="form-controll "
              required
              minLength={3}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="promote" className="form-label">
              Mettre en avant
            </label>
            <select
              onChange={(e) => setPromote(e.target.value)}
              id="promote"
              className="form-controll "
              required
              maxLength={1}
            >
              <option value={1}>Oui</option>
              <option value={0}>Non</option>
            </select>
          </div>
          <div className="form-group">
            {errorImg || errorVideo !== null ? (
              <button
                className="containerbtn"
                type="button"
                style={{ background: "red", color: "white" }}
              >
                Télécharger
              </button>
            ) : (
              <button className="containerbtn" type="submit">
                Télécharger
              </button>
            )}
          </div>
        </form>
        <Navbar />
      </div>
      <ToastContainer />
    </>
  );
}

export default Upload;
