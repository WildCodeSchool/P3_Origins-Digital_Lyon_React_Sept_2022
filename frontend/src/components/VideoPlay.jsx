/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlay() {
  const { videos, index } = useContext(CurrentVideosContext);
  const videoName = videos[index].name.substring(37);

  return (
    <div className="video-play-container">
      <div className="video-play">
        <Player
          type="video/mp4"
          src={`http://localhost:5000/${videos[index].name}`}
        />
      </div>
      <h2>{videoName}</h2>
      <p className="date-video">{videos[index].creation_date}</p>
      <p className="video-description">{videos[index].description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{videos[index].img}</h3>
        </div>
        <div className="like-share">
          <li className="favorite" />
          <li className="playlist" />
          <li className="share" />
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
