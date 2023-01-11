import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Fortnite from "../asset/image/fortnite_minia.jpg";

export default function Favorites() {
  return (
    <div className="fav">
      <h2>Favorites</h2>
      <div className="favContainer">
        <div role="navigation" className="favVideoContainer">
          <img src={Fortnite} alt="fortnite" />
          <div className="playButton">
            <BsFillPlayCircleFill className="playIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
