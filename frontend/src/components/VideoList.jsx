import React, { useEffect, useContext } from "react";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "./VideoBox";

export default function VideoList() {
  const { videos, setVideos } = useContext(CurrentVideosContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((vids) => {
        setVideos(vids);
      });
  }, []);

  return (
    <div>
      <ul className="videosContainer">
        {videos.map((item, i) => {
          return (
            <li key={item.name}>
              <VideoBox
                index={i}
                videoName={item.name}
                category={item.category}
                description={item.description}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
