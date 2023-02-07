import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";
import VideoBox from "../components/VideoBox";
import ReturnPageButton from "../components/ReturnPageButton";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "../components/Navbar";

export default function FavPage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { user, token } = useContext(CurrentUserContext);
  const { selectedId } = useContext(CurrentVideosContext);
  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);

  const toggleFavorite = async (userId, videoId) => {
    if (favortieVideos.find((videos) => videos.id === videoId)) {
      try {
        await axios.delete(`${BACKEND_URL}/api/favoris/${userId}/${videoId}`);
        fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
          .then((res) => res.json())
          .then((videos) => {
            setFavoriteVideos(videos);
          });
      } catch (err) {
        console.error(
          `Erreur lors de la suppression du favori: ${err.message}`
        );
      }
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/favoris`,
          {
            user_id: userId,
            videos_id: videoId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
          .then((res) => res.json())
          .then((videos) => {
            setFavoriteVideos(videos);
          });
        console.warn(response.data);
      } catch (err) {
        console.error(`Erreur lors de l'ajout du favori: ${err.message}`);
      }
    }
  };

  return (
    <div className="favorite-page-container">
      <ReturnPageButton />

      <h2>Favoris</h2>
      <div className="favorite-container">
        {favortieVideos.map((video) => (
          <div className="favorite-box" key={video.id}>
            <VideoBox video={video} />
            <button
              className="favContainer"
              type="button"
              onClick={() => toggleFavorite(user.id, selectedId)}
            >
              <li
                className={
                  favortieVideos.find((videos) => videos.id === selectedId)
                    ? "favorite "
                    : "no-favorite "
                }
              />
            </button>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
