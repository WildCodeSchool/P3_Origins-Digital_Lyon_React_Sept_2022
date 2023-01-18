import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "../pages/Home";
import Library from "../pages/Library";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import VideoPlayer from "../pages/VideoPlayer";
import FavPage from "../pages/FavPage";
import PlaylistPage from "../pages/PlaylistPage";
import Register from "./Register";
import Upload from "./Upload";
import UsersTable from "./UsersTable";
import VideosTable from "./VideosTable";

export default function Routing() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<Library />} />
      <Route path="/favorites" element={<FavPage videos={videos} />} />
      <Route path="/myPlaylist" element={<PlaylistPage videos={videos} />} />
      <Route path="/search" element={<SearchPage videos={videos} />} />
      <Route path="/login" element={<ProfilePage />} />
      <Route path="/player" element={<VideoPlayer videos={videos} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/usersManagement" element={<UsersTable />} />
      <Route path="/videosManagement" element={<VideosTable />} />
    </Routes>
  );
}
