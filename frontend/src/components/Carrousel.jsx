import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LOL from "../asset/1.jpg";
import LOL2 from "../asset/2.jpg";
import LOL3 from "../asset/3.jpg";

function Carrousel() {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showThumbs="" showStatus="">
        <div>
          <img src={LOL} alt="LOL" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={LOL2} alt="LOL2" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={LOL3} alt="LOL3" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}

export default Carrousel;
