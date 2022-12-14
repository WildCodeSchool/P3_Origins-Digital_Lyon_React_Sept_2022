import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

import "./style/index.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Library />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
