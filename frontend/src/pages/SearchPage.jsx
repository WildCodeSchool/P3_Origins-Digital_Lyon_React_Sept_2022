/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import VideoBox from "../components/VideoBox";

export default function SearchPage({ videos }) {
  const [search, setSearch] = useState("");

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
      <div>
        {search === "" ? (
          <div className="">
            <h2 className="littleTitle">Parcourir tout</h2>
            <ul>
              {videos.map((vid) => {
                return (
                  <li key={vid.id}>
                    <VideoBox video={vid} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <ul>
              {videos
                .filter((video) => video.name.toLowerCase().includes(search))
                .map((video, i) => (
                  <li>
                    <VideoBox
                      videoName={video.name}
                      index={i}
                      description={video.description}
                      key={video.id}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
