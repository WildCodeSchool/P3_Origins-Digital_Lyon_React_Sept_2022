/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

export default function VideoBox({ video }) {
  const navigate = useNavigate();
  return (
    <div className="boxContainer">
      <div className="miniaContainer">
        <img src={video.img} alt={video.name} />
      </div>
      <div className="vidInfoContainer">
        <h4
          onClick={() => {
            navigate("/player");
          }}
          className="videoTitle"
        >
          {video.name}
        </h4>
        <p>{video.description}</p>
        <div className="categoryContainer">
          <button className="categoryButton" type="button">
            Category
          </button>
        </div>
      </div>
      <div className="moreLogoContainer">
        <FiMoreVertical className="moreLogo" />
      </div>
    </div>
  );
}
