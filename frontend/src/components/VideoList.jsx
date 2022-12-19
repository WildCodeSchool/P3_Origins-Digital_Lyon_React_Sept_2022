import React from "react";
import VideoBox from "./VideoBox";
import COD from "../asset/image/cod_minia.jpg";
import TFT from "../asset/image/TFT_MINIA.jpg";
import StreetFighter from "../asset/image/street_fighter.jpg";
import RL from "../asset/image/rocket_league.jpg";

export default function VideoList() {
  const items = [
    {
      videoName: "Titre video",
      miniature: COD,
      category: ["fps", "test", "sport"],
      description: "lorjijrdf hvzhfvzhje vdghzvdhjv zjhvedhjzvdehj",
    },
    {
      videoName: "Titre video 2",
      miniature: TFT,
      category: ["fps", "test", "sport"],
      description: "lorji jrdfhvz hfvzhjevdg hzvdhjvzjh vedhjzvdehj",
    },
    {
      videoName: "Titre video 3",
      miniature: StreetFighter,
      category: ["fps", "test", "sport"],
      description: "lorji jrdfhvzhfvzhj evdghzvdhjvz jhvedhjzvdehj",
    },
    {
      videoName: "Titre video 4",
      miniature: RL,
      category: ["fps", "test", "sport"],
      description: "lorjijr dfhvzhfvzhj evdghzvdh jvzjhved hjzvdehj",
    },
  ];
  return (
    <div>
      <ul className="videosContainer">
        {items.map((item, i) => {
          return (
            <li key={i}>
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
