/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlay() {
  const { vid } = useContext(CurrentVideosContext);

  return (
    <div className="video-play-container">
      <div className="video-play">
        <Player
          height={250}
          width={300}
          type="video/mp4"
          src={`http://localhost:5000/api/videos/${vid.url}`}
        />
      </div>
      <h2>{vid.name}</h2>
      <p className="date-video">{vid.name}</p>
      <p className="video-description">{vid.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{vid.img}</h3>
        </div>
      </div>
      <div className="like-share">ded</div>
    </div>
  );
}

export default VideoPlay;
