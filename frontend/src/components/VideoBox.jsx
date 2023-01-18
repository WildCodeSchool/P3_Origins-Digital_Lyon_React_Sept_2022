/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FiMoreVertical } from "react-icons/fi";
import CurrentVideosContext from "../../contexts/videosContext";

export default function VideoBox({
  videoName,
  description,
  category,
  img,
  index,
}) {
  const { setIndex, videos, setVid } = useContext(CurrentVideosContext);

  const navigate = useNavigate();
  return (
    <div className="boxContainer">
      <div className="miniaContainer">
        <img src={img} alt={videoName} />
      </div>
      <div className="vidInfoContainer">
        <h4
          onClick={() => {
            navigate("/player");
            setIndex(index);
            setVid(videos[index]);
          }}
          className="videoTitle"
        >
          {videoName}
        </h4>
        <p>{description}</p>
        <div className="categoryContainer">
          <button className="categoryButton" type="button">
            {category}
          </button>
        </div>
      </div>
      <div className="moreLogoContainer">
        <FiMoreVertical className="moreLogo" />
      </div>
    </div>
  );
}

VideoBox.propTypes = PropTypes.node.isRequired;
