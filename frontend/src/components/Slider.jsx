import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoBox from "./VideoBox";

function Slider() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [videosSlider, setVideosSlider] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos/promote`)
      .then((response) => {
        setVideosSlider(response.data);
      })
      .catch((err) => console.error(err));
  }, [setVideosSlider]);
  return (
    <div className="slider-container">
      <h2>Suggestion</h2>

      <div className="slider-wrapper">
        {videosSlider.map((video) => (
          <div key={video.id}>
            <VideoBox video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
