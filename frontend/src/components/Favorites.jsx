import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Fortnite from "../asset/image/fortnite_minia.jpg";

export default function Favorites() {
  return (
    <div className="fav">
      <h2>Favoris</h2>
      <NavLink to="/favorites">
        <div className="favContainer">
          <div role="navigation" className="favVideoContainer">
            <img src={Fortnite} alt="fortnite" />
            <div className="playButton">
              <BsFillPlayCircleFill className="playIcon" />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
