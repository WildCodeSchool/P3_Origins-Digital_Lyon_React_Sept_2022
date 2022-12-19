import React from "react";
import LOL from "../asset/1.jpg";
import LOL2 from "../asset/2.jpg";
import LOL3 from "../asset/3.jpg";

const cards = [
  {
    image: LOL,
    title: "Vidéo 1",
  },
  {
    image: LOL2,
    title: "Vidéo 2",
  },
  {
    image: LOL3,
    title: "Vidéo 3",
  },
];

function Cards() {
  return (
    <div>
      <div className="container">
        <div className="cards">
          {cards.map((card, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="card">
              <img src={card.image} alt="img" />
              <h3>{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
