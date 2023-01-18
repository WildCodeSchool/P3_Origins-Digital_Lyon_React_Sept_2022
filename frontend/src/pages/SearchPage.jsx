import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import VideoBox from "../components/VideoBox";
import CurrentVideosContext from "../../contexts/videosContext";

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
              {videos.map((vid, i) => {
                return (
                  <li key={vid.id}>
                    <VideoBox
                      videoName={vid.name}
                      description={vid.description}
                      category={vid.category}
                      img={vid.img}
                      index={i}
                    />
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
