import React from "react";
import COD from "../asset/image/cod_minia.jpg";
import TFT from "../asset/image/TFT_MINIA.jpg";
import StreetFighter from "../asset/image/street_fighter.jpg";
import RL from "../asset/image/rocket_league.jpg";

export default function Playlists() {
  return (
    <div className="playlists">
      <h3>Mes playlists</h3>
      <div className="videoContainer">
        <div className="miniatureContainer">
          <img src={COD} alt="cod" />
          <h5>Playlist #1</h5>
        </div>
        <div className="miniatureContainer">
          <img src={TFT} alt="tft" />
          <h5>Playlist #2</h5>
        </div>
        <div className="miniatureContainer">
          <img src={StreetFighter} alt="streetFighter" />
          <h5>Playlist #3</h5>
        </div>
        <div className="miniatureContainer">
          <img src={RL} alt="rocket-league" />
          <h5>Playlist #4</h5>
        </div>
      </div>
    </div>
  );
}
