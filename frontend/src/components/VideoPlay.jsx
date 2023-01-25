/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlay({ video }) {
  const { videoDate, selectedCategoryId } = useContext(CurrentVideosContext);

  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const [category, setCategory] = useState({});

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category/${selectedCategoryId}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="video-play-container">
      <Player
        autoPlay
        height={250}
        width={300}
        type="video/mp4"
        src={`http://localhost:5000/api/videos/${video.url}`}
      />
      <h2>{video.name}</h2>
      <p className="date-video">{videoDate(video)}</p>
      <p className="video-description">{video.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{category.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
