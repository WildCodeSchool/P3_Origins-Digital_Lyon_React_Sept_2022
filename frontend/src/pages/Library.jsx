import React from "react";
import Navbar from "../components/Navbar";
import Favorites from "../components/Favorites";
import Playlists from "../components/Playlists";

function Library() {
  return (
    <div>
      <h1>My Library</h1>
      <div className="libraryPage">
        <Favorites />
        <Playlists />
      </div>
      <Navbar />
    </div>
  );
}

export default Library;
