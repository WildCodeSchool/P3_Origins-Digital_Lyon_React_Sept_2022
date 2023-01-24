/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "./VideoBox";

function VideoList() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const { videos } = useContext(CurrentVideosContext);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category`)
      .then((res) => setCategory(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="videosContainer">
      {videos.map((vid) => (
        <VideoBox video={vid} key={vid.id} category={category} />
      ))}
    </div>
  );
}

export default VideoList;
