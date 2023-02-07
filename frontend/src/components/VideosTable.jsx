import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "./Navbar";
import ReturnPageButton from "./ReturnPageButton";
import VideoBox from "./VideoBox";

export default function UsersTable() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [getVideoId, setGetVideoId] = useState(0);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [videosList, setVideosList] = useState([]);
  const { token } = useContext(CurrentUserContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/videos`)
      .then((res) => res.json())
      .then((videos) => setVideosList(videos));
  }, []);

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const deleteVideo = (id) => {
    fetch(`${BACKEND_URL}/api/videos/${id}`, DELETErequestOptions).then(
      (res) => {
        if (res) {
          fetch(`${BACKEND_URL}/api/videos`)
            .then((response) => response.json())
            .then((videos) => setVideosList(videos));
        }
      }
    );
  };

  const updatePromote = (video) => {
    axios
      .post(
        `${BACKEND_URL}/api/videos/promote/${video.id}`,
        {
          promote: !video.promote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res) {
          axios
            .get(`${BACKEND_URL}/api/videos`)
            .then((videos) => setVideosList(videos.data));
        }
      });
  };

  return (
    <div className="video-table-container">
      <ReturnPageButton />
      <h3>Liste vidéos</h3>
      <input
        className="search-video"
        type="text"
        placeholder="Rechercher une vidéo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== "" ? (
        <div className="video-table">
          {videosList
            .filter((video) => video.name.toLowerCase().includes(search))

            .map((video) => (
              <div className="video-list" key={video.id}>
                <ul className="video-info" key={video.id}>
                  <VideoBox video={video} className="video-box-manage" />
                </ul>
                <ul className="video-manage">
                  <li>#{video.id}</li>

                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        openModal();
                        setGetVideoId(video.id);
                      }}
                    >
                      Supprimer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updatePromote(video);
                      }}
                    >
                      {video.promote ? "Oui" : "Non"}
                    </button>
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
                      <button
                        type="button"
                        onClick={() => {
                          openModal();
                          setGetVideoId(video.id);
                        }}
                      >
                        Supprimer
                      </button>

                      <h5>Mise en avant</h5>
                      <button
                        type="button"
                        onClick={() => {
                          updatePromote(video);
                        }}
                      >
                        {video.promote ? "Oui" : "Non"}
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Navbar />
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Modal"
        style={{
          content: {
            height: "auto",
            bottom: "auto",
            width: "80vw",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
        <div className="modal-buttons">
          <button type="button" onClick={closeModal} className="close_btn">
            Fermer
          </button>
          <button
            className="delete_btn"
            type="button"
            onClick={() => {
              deleteVideo(getVideoId);
              closeModal();
            }}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
