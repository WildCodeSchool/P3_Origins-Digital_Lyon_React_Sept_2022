import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import FavPage from "./pages/FavPage";
import PlaylistPage from "./pages/PlaylistPage";

import "./style/index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Library />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/myPlaylist" element={<PlaylistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
