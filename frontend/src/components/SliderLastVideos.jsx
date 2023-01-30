import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "./VideoBox";

function SliderLastVideos() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [videosSlider, setVideosSlider] = useState([]);
  const { setSelectedName, setSelectedId } = useContext(CurrentVideosContext);

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
      <h2>Derniers ajouts</h2>

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

export default SliderLastVideos;
