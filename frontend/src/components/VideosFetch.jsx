import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Player } from "video-react";

import CurrentVideosContext from "../../contexts/videosContext";

function VideosFetch() {
  const { setVideos, videos } = useContext(CurrentVideosContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchData();
  }, []);
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
