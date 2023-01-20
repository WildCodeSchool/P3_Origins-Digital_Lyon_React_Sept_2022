/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import CurrentVideosContext from "../../contexts/videosContext";

export default function VideoBox({ video }) {
  const { setSelectedName, setSelectedId } = useContext(CurrentVideosContext);

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
            setSelectedName(video.url);
            setSelectedId(video.id);
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
