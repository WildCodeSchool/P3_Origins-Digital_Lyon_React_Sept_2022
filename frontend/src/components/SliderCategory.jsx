import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SliderCategory({ setSelectedCategory }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [categorySlider, setCategorySlider] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category/`)
      .then((response) => {
        setCategorySlider(response.data);
      })
      .catch((err) => console.error(err));
  }, [setCategorySlider]);
  return (
    <div className="slider-container">
      <h2>Catégories</h2>

      <div className="slider-wrapper">
        {categorySlider.map((category) => (
          <Link
            to="/search"
            onClick={() => setSelectedCategory(String(category.id))}
            key={category.id}
          >
            <img
              key={category.id}
              className="slider-item"
              src={category.img}
              alt="imgOfSlider"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SliderCategory;
