/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlay() {
  const { index } = useContext(CurrentVideosContext);
  const [vid, setVid] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((vids) => vids.json())
      .then((vids) => setVid(vids));
  });

  const videoName = vid[index].name.substring(37);

  return (
    <div className="video-play-container">
      <div className="video-play">
        <Player
          height={250}
          width={300}
          type="video/mp4"
          src={`http://localhost:5000/api/${vid[index].name}`}
        />
      </div>
      <h2>{videoName}</h2>
      <p className="date-video">{vid[index].creation_date}</p>
      <p className="video-description">{vid[index].description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{vid[index].img}</h3>
        </div>
      </div>
      <div className="like-share">ded</div>
    </div>
  );
}

export default VideoPlay;
