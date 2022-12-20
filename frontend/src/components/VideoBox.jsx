/* eslint-disable react/prop-types */
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function VideoBox({
  videoName,
  miniature,
  description,
  category,
}) {
  return (
    <div className="boxContainer">
      <div className="miniaContainer">
        <img src={miniature} alt={videoName} />
      </div>
      <div className="vidInfoContainer">
        <h4>{videoName}</h4>
        <p>{description}</p>
        <div className="categoryContainer">
          {category.map((val) => (
            <button className="categoryButton" type="button">
              {val}
            </button>
          ))}
        </div>
      </div>
      <div className="moreLogoContainer">
        <FiMoreVertical className="moreLogo" />
      </div>
    </div>
  );
}
