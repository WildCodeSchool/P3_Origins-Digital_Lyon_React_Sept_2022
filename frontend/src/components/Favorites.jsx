import React from "react";
import { NavLink } from "react-router-dom";
import favorite from "../asset/image/favorite.png";

export default function Favorites() {
  return (
    <div className="fav">
      <h2>Mes favoris</h2>
      <NavLink to="/favorites">
        <div className="favContainer">
          <div role="navigation" className="favVideoContainer">
            <img src={favorite} alt="fortnite" />
            <div className="playButton" />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
