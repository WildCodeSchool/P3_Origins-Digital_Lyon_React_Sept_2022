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
        {search !== "" ? (
          <div className="searchpage-container">
            {videos
              .filter((video) => video.name.toLowerCase().includes(search))
              .map((video) => (
                <VideoBox video={video} key={video.id} />
              ))}
          </div>
        ) : (
          <div className="searchpage-container">
            {videos.map((vid) => {
              return <VideoBox video={vid} key={vid.id} />;
            })}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
