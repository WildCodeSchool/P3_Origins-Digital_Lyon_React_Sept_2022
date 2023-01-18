/* eslint-disable react/prop-types */
import React from "react";
import { Player } from "video-react";

function VideoPlay({ video }) {
  return (
    <div className="video-play-container">
      <Player
        height={250}
        width={300}
        type="video/mp4"
        src={`http://localhost:5000/api/videos/${video.url}`}
      />
      <h2>{video.name}</h2>
      <p className="date-video">{video.name}</p>
      <p className="video-description">{video.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{video.img}</h3>
        </div>
      </div>
      <div className="like-share">ded</div>
    </div>
  );
}

export default VideoPlay;
