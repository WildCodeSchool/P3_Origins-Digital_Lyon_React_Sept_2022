/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentVideosContext from "../../contexts/videosContext";

export default function VideoBox({ video }) {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const { setSelectedName, setSelectedId, videoDate } =
    useContext(CurrentVideosContext);

  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category/${video.category_id}`)
      .then((res) => {
        setSelectedCategory(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const navigate = useNavigate();
  return (
    <div className="image-wrapper">
      <div className="image-overlay">
        <div className="video-info">
          <div className="video-info-text">
            <p className="video-name medium">{video.name}</p>
            <p className="video-subtext medium">{videoDate(video)}</p>
          </div>
          <button
            type="button"
            className="btn-play"
            aria-label="Naviguer vers la vidéo"
            onClick={() => {
              navigate("/player");
              setSelectedName(video.url);
              setSelectedId(video.id);
            }}
          />
        </div>
      </div>
      <img
        src={`http://localhost:5000/api/videos/${video.img}`}
        alt={video.name}
      />
      <span className="video-time">{selectedCategory.name}</span>
    </div>
  );
}
