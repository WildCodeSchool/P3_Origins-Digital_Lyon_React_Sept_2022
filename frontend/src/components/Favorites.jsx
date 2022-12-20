/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Fortnite from "../asset/image/fortnite_minia.jpg";

export default function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="fav">
      <h2>Favorites</h2>
      <div className="favContainer">
        <div
          role="navigation"
          className="favVideoContainer"
          onClick={() => navigate("/favorites")}
        >
          <img src={Fortnite} alt="fortnite" />
          <div className="playButton">
            <BsFillPlayCircleFill className="playIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
