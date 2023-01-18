import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "../components/VideoBox";
import VideosFetch from "../components/VideosFetch";

export default function SearchPage() {
  const { videos } = useContext(CurrentVideosContext);
  const [search, setSearch] = useState("");

  // console.log(videos);

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
      {search === "" ? (
        <div>
          <VideosFetch />
        </div>
      ) : (
        <ul>
          {videos
            .filter((video) => video.video_id === search)

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
      )}

      <h2 className="littleTitle">Parcourir tout</h2>
      <Navbar />
    </div>
  );
}
