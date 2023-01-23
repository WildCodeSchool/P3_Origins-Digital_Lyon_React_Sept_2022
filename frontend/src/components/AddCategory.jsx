import React, { useContext, useRef, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";
import Navbar from "./Navbar";

function AddCategory() {
  const categoryToast = () =>
    toast.success("Catégorie ajoutée !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const categoryFailedToast = () =>
    toast.error("La catégorie n'a pas pu être ajoutée 😞😞😞", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const categoryNoFileToast = () =>
    toast.warn(" Il manque l'image de ta catégorie", {
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
  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgRef.current.files[0]) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("img", imgRef.current.files[0]);
      formData.append("description", description);
      formData.append("name", name);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      axios
        .post(`http://localhost:5000/api/category`, formData, config)
        .then(() => {
          categoryToast();
        })
        .catch((error) => {
          console.error(error);
          categoryFailedToast();
        });
    } else {
      categoryNoFileToast();
    }
    setName("");
    setDescription("");
  };

  return (
    <>
      <div className="upload-container">
        <ReturnPageButton />
        <h2>
          <strong> Ajout de Catégorie</strong>
        </h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group file-area">
            <label htmlFor="img" className="form-label">
              Image
            </label>
            <input type="file" ref={imgRef} id="img" required="required" />
            <div className="file-dummy">
              <div className="success">
                Votre fichier a bien été sélectionnée
              </div>
              <div className="default">Sélectionner une image</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom de la Catégorie
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="form-controll"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="form-controll "
              required="required"
            />
          </div>
          <div className="form-group">
            <button className="containerbtn" type="submit">
              Ajouter
            </button>
          </div>
        </form>
        <Navbar />
      </div>
      <ToastContainer />
    </>
  );
}

export default AddCategory;
