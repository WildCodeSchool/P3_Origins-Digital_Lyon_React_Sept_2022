/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Comment from "../components/Comment";
import VideoPlay from "../components/VideoPlay";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlayer() {
  const { selectedId } = useContext(CurrentVideosContext);
  const [currentVideoComments, setCurrentVideoComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/infos/${selectedId}`)
      .then((res) => res.json())
      .then((videos) => setCurrentVideoComments(videos.comment));
  }, []);
  return (
    <div className="player-page">
      <Header />
      <Navbar />
      <VideoPlay />
      <Slider />
      <Comment
        currentVideoComments={currentVideoComments}
        setCurrentVideoComments={setCurrentVideoComments}
      />
    </div>
  );
}

export default VideoPlayer;
