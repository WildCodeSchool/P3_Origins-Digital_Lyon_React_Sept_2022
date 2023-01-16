import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function SearchPage() {
  const [videoData, setVideoData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((videos) => setVideoData(videos));
  });

  return (
    <div className="pageContainer">
      <div className="searchTitle">
        <h1>Recherche</h1>
      </div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="Que souhaitez vous regarder"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {videoData
          .filter((video) => video.video_id === search)

          .map((video) => (
            <li>
              <data video={video} key={video.id} />
            </li>
          ))}
        <h2>Parcourir tout</h2>
      </ul>

      <h2 className="littleTitle">Parcourir tout</h2>
      <Navbar />
    </div>
  );
}
