/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlay() {
  const { videos, selectedId } = useContext(CurrentVideosContext);

  const selectedVideo = videos.filter((vid) => vid.id === selectedId);
  return (
    <div className="video-play-container">
      <Player
        height={250}
        width={300}
        type="video/mp4"
        src={`http://localhost:5000/api/videos/${selectedVideo.name}`}
      />
      <h2>{selectedVideo.name}</h2>
      <p className="date-video">{selectedVideo.creation_date}</p>
      <p className="video-description">{selectedVideo.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{selectedVideo.img}</h3>
        </div>
      </div>
      <div className="like-share">ded</div>
    </div>
  );
}

export default VideoPlay;
