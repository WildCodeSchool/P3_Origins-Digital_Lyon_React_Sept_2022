import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Favorites from "../components/Favorites";
import Playlists from "../components/Playlists";
import ReturnPageButton from "../components/ReturnPageButton";

function Library() {
  return (
    <div>
      <div className="libraryContainer">
        <ReturnPageButton />
        <h1>My Library</h1>
        <div className="libraryPage">
          <div>
            <Favorites />
            <Link to="/favorites">
              <button className="btn " type="button">
                View All
              </button>
            </Link>
          </div>
        </div>
        <Playlists />
      </div>
      <Navbar />
    </div>
  );
}

export default Library;
