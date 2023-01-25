import React from "react";
import VideoList from "../components/VideoList";
import ReturnPageButton from "../components/ReturnPageButton";
import Navbar from "../components/Navbar";

export default function PlaylistPage() {
  return (
    <div>
      <div className="returnContainer">
        <ReturnPageButton />
      </div>
      <h2>My playlist</h2>
      <div>
        <VideoList />
      </div>
      <Navbar />
    </div>
  );
}
