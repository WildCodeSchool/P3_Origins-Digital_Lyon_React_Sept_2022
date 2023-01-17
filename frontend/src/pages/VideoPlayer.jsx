import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Comment from "../components/Comment";
import VideoPlay from "../components/VideoPlay";
import VideosFetch from "../components/VideosFetch";

function VideoPlayer() {
  const comment = {
    author: {
      name: "John Doe",
      avatar: "../../src/asset/image/user.svg",
    },
    message: "This is a great video!",
  };
  return (
    <div className="player-page">
      <Header />
      <VideoPlay />
      <Slider />
      <Navbar />
      <Comment author={comment.author} message={comment.message} />
      <VideosFetch />
    </div>
  );
}

export default VideoPlayer;
