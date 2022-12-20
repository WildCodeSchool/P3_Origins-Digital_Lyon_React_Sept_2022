import React from "react";
import ReturnPageButton from "../components/ReturnPageButton";
import VideoList from "../components/VideoList";

export default function FavPage() {
  return (
    <div>
      <div className="returnContainer">
        <ReturnPageButton />
      </div>
      <h2>My Favorites</h2>
      <div className="listContainer">
        <VideoList />
      </div>
    </div>
  );
}
