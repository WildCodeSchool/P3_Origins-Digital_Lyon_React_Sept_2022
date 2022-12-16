import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Fortnite from "../asset/image/fortnite_minia.jpg";

export default function Favorites() {
  return (
    <div className="fav">
      <h3>Favoris</h3>
      <div className="favVideoContainer">
        <img src={Fortnite} alt="fortnite" />
        <BsFillPlayCircleFill className="playButton" />
      </div>
    </div>
  );
}
