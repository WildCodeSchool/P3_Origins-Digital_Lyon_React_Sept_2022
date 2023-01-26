import React from "react";
import Navbar from "../components/Navbar";
import Favorites from "../components/Favorites";
import Playlists from "../components/Playlists";

function Library() {
  return (
    <div className="libraryContainer">
      <h1 className="library-title">My Library</h1>
      <div className="libraryPage">
        <Favorites />
        <Playlists />
      </div>
      <Navbar />
    </div>
  );
}

export default Library;
