import React from "react";
import DefaultImageSlider from "../asset/4.jpg";

function Slider() {
  return (
    <div>
      <h2>Category</h2>

      <div className="slider-container">
        <div className="slider-wrapper">
          <img className="slider-item" src={DefaultImageSlider} alt="img1" />
          <img className="slider-item" src={DefaultImageSlider} alt="img1" />
          <img className="slider-item" src={DefaultImageSlider} alt="img1" />
          <img className="slider-item" src={DefaultImageSlider} alt="img1" />
          <img className="slider-item" src={DefaultImageSlider} alt="img1" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
