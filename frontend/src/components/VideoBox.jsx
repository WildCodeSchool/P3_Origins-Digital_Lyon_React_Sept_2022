/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentVideosContext from "../../contexts/videosContext";

export default function VideoBox({ video }) {
  const { setSelectedName, setSelectedId } = useContext(CurrentVideosContext);

  const navigate = useNavigate();
  return (
    <div className="image-wrapper">
      <div className="image-overlay">
        <div className="video-info">
          <div className="video-info-text">
            <p className="video-name medium">{video.name}</p>
            <p className="video-subtext medium">Date</p>
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
      <span className="video-time">Category</span>
    </div>
  );
}
