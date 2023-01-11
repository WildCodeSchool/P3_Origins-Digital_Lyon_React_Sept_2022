import React from "react";
import VideoBox from "./VideoBox";
import COD from "../asset/image/cod_minia.jpg";
import TFT from "../asset/image/TFT_MINIA.jpg";
import SF from "../asset/image/street_fighter.jpg";
import RL from "../asset/image/rocket_league.jpg";

export default function VideoList() {
  const items = [
    {
      videoName: "Titre video",
      miniature: COD,
      category: ["fps", "test", "sport"],
      description:
        "Retrouvez toute l'actualité du sport électronique sur Call of Duty : compétitions, tournois, matchs, joueurs, transferts, équipes ; vous saurez tout sur la scène pro du jeu d'Activision et des différentes teams eSport sur CoD.",
    },
    {
      videoName: "Titre video 2",
      miniature: TFT,
      category: ["fps", "test", "sport"],
      description:
        "Dans ce nouvel ensemble, rassemblez votre super-escouade et sauvez la ville contre la menace des monstres",
    },
    {
      videoName: "Titre video 3",
      miniature: SF,
      category: ["fps", "test", "sport"],
      description:
        "Street Fighter est une série de jeux vidéo de combat en un contre un développée par Capcom, dont le premier épisode est publié en 1987. Street Fighter est l'une des plus populaires séries de jeux vidéo de combat de l'histoire",
    },
    {
      videoName: "Titre video 4",
      miniature: RL,
      category: ["fps", "test", "sport"],
      description:
        " Rocket League est un puissant hybride mêlant jeu de football d'arcade et carnage à quatre roues dans d'intenses rencontres",
    },
  ];
  return (
    <div>
      <ul className="videosContainer">
        {items.map((item) => {
          return (
            <li key={item.videoName}>
              <VideoBox
                miniature={item.miniature}
                videoName={item.videoName}
                category={item.category}
                description={item.description}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
