import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import CurrentVideosContext from "../../contexts/videosContext";

function Carrousel() {
  const { setSelectedName, setSelectedId } = useContext(CurrentVideosContext);

  const [videosPromoted, setVideoPromoted] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/promote`)
      .then((response) => {
        setVideoPromoted(response.data);
      })
      .catch((err) => console.error(err));
  }, [setVideoPromoted]);
  return (
    <div>
      <div className="carrouselContainer">
        <Carousel autoPlay infiniteLoop showThumbs="" showStatus="">
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
                  src={`http://localhost:5000/api/videos/${video.img}`}
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
