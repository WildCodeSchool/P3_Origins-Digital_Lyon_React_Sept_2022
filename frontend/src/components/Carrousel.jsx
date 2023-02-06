import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import CurrentVideosContext from "../../contexts/videosContext";

function Carrousel() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { setSelectedName, setSelectedId } = useContext(CurrentVideosContext);

  const [videosPromoted, setVideoPromoted] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos/promote`)
      .then((response) => {
        setVideoPromoted(response.data);
      })
      .catch((err) => console.error(err));
  }, [setVideoPromoted]);
  return (
    <div>
      <div className="carrouselContainer">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs=""
          showStatus=""
          dynamicHeight="false"
          interval="5000"
          transitionTime="500"
        >
          {videosPromoted.map((video) => (
            <Link
              to="/player"
              key={video.id}
              onClick={() => {
                setSelectedName(video.url);
                setSelectedId(video.id);
              }}
            >
              <div>
                <img
                  src={`${BACKEND_URL}/api/videos/${video.img}`}
                  alt={video.name}
                  className="carrouselImg"
                />
                <p className="legend">{video.name}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Carrousel;
