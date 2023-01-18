/* eslint-disable react/prop-types */

import React from "react";
import { Player } from "video-react";

function VideosFetch({ videos }) {
  return (
    <div>
      <div>
        {videos.map((video) => (
          <Player
            key={video.id}
            playsInline
            src={`http://localhost:5000/api/videos/${video.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default VideosFetch;
