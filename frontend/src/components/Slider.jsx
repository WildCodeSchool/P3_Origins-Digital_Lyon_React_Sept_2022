import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Category</h2>

      <div className="slider-container">
        <div className="slider-wrapper">
          {videosSlider.map((video) => (
            <img
              key={video.id}
              className="slider-item"
              src={`${BACKEND_URL}/api/videos/${video.img}`}
              alt="imgOfSlider"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
