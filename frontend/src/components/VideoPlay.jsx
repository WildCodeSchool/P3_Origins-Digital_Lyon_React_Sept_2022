import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";
import CurrentUserContext from "../../contexts/userContext";

function VideoPlay({ video }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { selectedName, selectedId, videoDate } =
    useContext(CurrentVideosContext);
  const { user, token } = useContext(CurrentUserContext);
  const [category, setCategory] = useState({});
  const [videoPlayed, setVideoPlayed] = useState([]);

  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category/${videoPlayed.category_id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => console.error(err));
  }, [videoPlayed]);

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
    <div className="video-play-container">
      <Player
        poster={`${BACKEND_URL}/api/videos/${videoPlayed.img}`}
        autoPlay
        height={450}
        width={300}
        type="video/mp4"
        src={`${BACKEND_URL}/api/videos/${selectedName}`}
      />
      <h2>{video.name}</h2>
      <p className="date-video">{videoDate(video)}</p>
      <p className="video-description">{video.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>{category.name}</h3>
        </div>
        <div className="like-share">
          <button
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
      </div>
    </div>
  );
}

export default VideoPlay;
