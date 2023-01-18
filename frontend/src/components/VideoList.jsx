/* eslint-disable react/prop-types */
import React from "react";
import VideoBox from "./VideoBox";

function VideoList({ videos }) {
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
