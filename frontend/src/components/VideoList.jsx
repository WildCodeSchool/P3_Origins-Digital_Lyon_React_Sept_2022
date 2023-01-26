import React, { useContext } from "react";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "./VideoBox";

function VideoList() {
  const { videos } = useContext(CurrentVideosContext);

  return (
    <div className="videosContainer">
      {videos.map((vid) => (
        <VideoBox video={vid} key={vid.id} />
      ))}
    </div>
  );
}

export default VideoList;
