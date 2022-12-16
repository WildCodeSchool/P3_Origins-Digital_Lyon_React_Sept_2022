import React from "react";
import Navbar from "../components/Navbar";
import Favorites from "../components/Favorites";
import Playlists from "../components/Playlists";

function Library() {
  return (
    <div className="libraryPage">
      <h2>BIBLIOTHEQUE</h2>
      <Navbar />
      <Favorites />
      <Playlists />
    </div>
  );
}

export default Library;
