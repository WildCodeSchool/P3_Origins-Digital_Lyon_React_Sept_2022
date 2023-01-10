import React from "react";
import IMG1 from "../asset/4.jpg";

function Slider() {
  return (
    <div>
      <h2>Name</h2>

      <div className="slider-container">
        <div className="slider-wrapper">
          <img className="slider-item" src={IMG1} alt="img1" />
          <img className="slider-item" src={IMG1} alt="img1" />
          <img className="slider-item" src={IMG1} alt="img1" />
          <img className="slider-item" src={IMG1} alt="img1" />
          <img className="slider-item" src={IMG1} alt="img1" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
