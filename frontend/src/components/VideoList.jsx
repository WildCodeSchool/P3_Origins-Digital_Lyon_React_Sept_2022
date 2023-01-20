/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "./VideoBox";

function VideoList() {
  const { videos } = useContext(CurrentVideosContext);

  return (
    <div>
      <ul className="videosContainer">
        {videos.map((vid) => (
          <li key={vid.id}>
            <VideoBox video={vid} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;
