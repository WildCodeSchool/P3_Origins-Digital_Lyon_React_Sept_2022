import React from "react";
import { useNavigate } from "react-router-dom";
import COD from "../asset/image/cod_minia.jpg";
import TFT from "../asset/image/TFT_MINIA.jpg";
import StreetFighter from "../asset/image/street_fighter.jpg";
import RL from "../asset/image/rocket_league.jpg";

export default function Playlists() {
  const navigate = useNavigate();
  const goList = () => navigate("/myPlaylist");
  return (
    <div className="playlists">
      <h2>Mes playlists</h2>
      <div className="videoContainer">
        <button type="button" onClick={goList} className="button-playlist">
          <div className="miniatureContainer">
            <img src={COD} alt="cod" />
            <h5>Playlist #1</h5>
          </div>
        </button>
        <button type="button" onClick={goList} className="button-playlist">
          <div className="miniatureContainer">
            <img src={TFT} alt="tft" />
            <h5>Playlist #2</h5>
          </div>
        </button>
        <button type="button" onClick={goList} className="button-playlist">
          <div className="miniatureContainer">
            <img src={StreetFighter} alt="streetFighter" />
            <h5>Playlist #3</h5>
          </div>
        </button>
        <button type="button" onClick={goList} className="button-playlist">
          <div className="miniatureContainer">
            <img src={RL} alt="rocket-league" />
            <h5>Playlist #4</h5>
          </div>
        </button>
      </div>
    </div>
  );
}
