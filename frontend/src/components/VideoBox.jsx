/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FiMoreVertical } from "react-icons/fi";
import CurrentVideosContext from "../../contexts/videosContext";

export default function VideoBox({ videoName, description, category, index }) {
  const { setIndex } = useContext(CurrentVideosContext);

  const navigate = useNavigate();
  return (
    <div className="boxContainer">
      <div className="miniaContainer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Contact-new.svg/1200px-Contact-new.svg.png"
          alt={videoName}
        />
      </div>
      <div className="vidInfoContainer">
        <h4
          onClick={() => {
            navigate("/player");
            setIndex(index);
          }}
          className="videoTitle"
        >
          {videoName.substring(37)}
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
