import React from "react";
import { Route, Routes } from "react-router-dom";
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

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<Library />} />
      <Route path="/favorites" element={<FavPage />} />
      <Route path="/myPlaylist" element={<PlaylistPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<ProfilePage />} />
      <Route path="/player" element={<VideoPlayer />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/usersManagement" element={<UsersTable />} />
    </Routes>
  );
}
