/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import { Player } from "video-react";

function VideoPlay(videos) {
  const { name, img, description, url } = videos;

  return (
    <div className="video-play-container">
      <Player
        height={250}
        width={300}
        type="video/mp4"
        src={`http://localhost:5000/api/videos/${url}`}
      />
      <h2>{name}</h2>
      <p className="date-video">{name}</p>
      <p className="video-description">{description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{img}</h3>
        </div>
      </div>
      <div className="like-share">ded</div>
    </div>
  );
}

export default VideoPlay;
