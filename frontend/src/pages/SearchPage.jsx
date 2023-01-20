/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import CurrentVideosContext from "../../contexts/videosContext";
import Navbar from "../components/Navbar";
import VideoBox from "../components/VideoBox";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  const { videos } = useContext(CurrentVideosContext);

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

                .map((video) => (
                  <li key={video.id}>
                    <VideoBox />
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
