/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Comment from "../components/Comment";
import VideoPlay from "../components/VideoPlay";
import CurrentVideosContext from "../../contexts/videosContext";

function VideoPlayer() {
  const { selectedId } = useContext(CurrentVideosContext);

  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const [videoPlayed, setVideoPlayed] = useState([]);

  useEffect(() => {
    axios
      .get(`${backUrl}/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const comment = {
    author: {
      name: "John Doe",
      avatar: "../../src/asset/image/user.svg",
    },
    message: "This is a great video!",
  };

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
      <VideoPlay video={videoPlayed} />
      <Slider />
      <Comment currentVideoComments={currentVideoComments} />
    </div>
  );
}

export default VideoPlayer;
