import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnPageButton from "./ReturnPageButton";
import Navbar from "./Navbar";
import CategoryTable from "./CategoryTable";

function AddCategory() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
  const [category, setCategory] = useState({
    name: "",
    img: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/category`, category)
      .then(() => {
        categoryToast();
      })
      .catch((error) => {
        console.error(error);
        categoryFailedToast();
      });
  };

  return (
    <>
      <div className="upload-container">
        <ReturnPageButton />
        <h2>
          <strong> Ajout de Catégorie</strong>
        </h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="img" className="form-label">
              Image
            </label>
            <input
              type="text"
              id="img"
              className="form-controll"
              required="required"
              onChange={(e) =>
                setCategory({ ...category, img: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom de la Catégorie
            </label>
            <input
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
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
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
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
        <CategoryTable />
        <Navbar />
      </div>
      <ToastContainer />
    </>
  );
}

export default AddCategory;
