import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "./Navbar";
import ReturnPageButton from "./ReturnPageButton";
import VideoBox from "./VideoBox";

export default function UsersTable() {
  const [videosList, setVideosList] = useState([]);
  const { token } = useContext(CurrentUserContext);
  const [search, setSearch] = useState("");

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/api/videos/${id}`, DELETErequestOptions);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((videos) => setVideosList(videos));
  }, []);
  return (
    <div className="video-table-container">
      <ReturnPageButton />
      <h3>Liste vidéos</h3>
      <input
        className="search-video"
        type="text"
        placeholder="Rechercher un utilisateur"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== "" ? (
        <div className="video-table">
          {videosList
            .filter((video) => video.name.toLowerCase().includes(search))

            .map((video) => (
              <div className="video-list">
                <ul key={video.id} className="video-info">
                  <VideoBox video={video} className="video-box-manage" />
                </ul>
                <ul className="video-manage">
                  <li>#{video.id}</li>

                  <li>
                    {!video.is_admin ? (
                      <button
                        type="button"
                        onClick={() => {
                          deleteVideo(video.id);
                        }}
                      >
                        Supprimer
                      </button>
                    ) : null}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="video-table">
          <div>
            {videosList.map((video) => {
              return (
                <div className="video-list">
                  <ul key={video.id} className="video-info">
                    <VideoBox video={video} className="video-box-manage" />
                  </ul>
                  <ul className="video-manage">
                    <li>#{video.id}</li>

                    <li>
                      {!video.is_admin ? (
                        <button
                          type="button"
                          onClick={() => {
                            deleteVideo(video.id);
                          }}
                        >
                          Supprimer
                        </button>
                      ) : null}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}
