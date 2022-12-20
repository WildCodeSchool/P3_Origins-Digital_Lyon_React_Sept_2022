import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LOL from "../asset/1.jpg";
import LOL2 from "../asset/2.jpg";
import LOL3 from "../asset/3.jpg";

function Carrousel() {
  return (
    <div>
      <div className="carrouselContainer">
        <Carousel autoPlay infiniteLoop showThumbs="" showStatus="">
          <Link to="/player">
            <div>
              <img src={LOL} alt="LOL" className="carrouselImg" />
              <p className="legend">Legend 1</p>
            </div>
          </Link>
          <Link to="/player">
            <div>
              <img src={LOL2} alt="LOL2" className="carrouselImg" />
              <p className="legend">Legend 2</p>
            </div>
          </Link>
          <Link to="/player">
            <div>
              <img src={LOL3} alt="LOL3" className="carrouselImg" />
              <p className="legend">Legend 3</p>
            </div>
          </Link>
        </Carousel>
      </div>
    </div>
  );
}

export default Carrousel;
