/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Player } from "video-react";
import CurrentVideosContext from "../../contexts/videosContext";
import CurrentUserContext from "../../contexts/userContext";

function VideoPlay() {
  const { selectedName, selectedId, videoDate } =
    useContext(CurrentVideosContext);
  const { user } = useContext(CurrentUserContext);

  const [videoPlayed, setVideoPlayed] = useState([]);

  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = async (userId, videoId) => {
    if (favortieVideos.find((video) => video.id === videoId)) {
      try {
        await axios.delete(
          `http://localhost:5000/api/favoris/${userId}/${videoId}`
        );
        fetch(`http://localhost:5000/api/favoris/${user.id}`)
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
        const response = await axios.post("http://localhost:5000/api/favoris", {
          user_id: userId,
          videos_id: videoId,
        });
        fetch(`http://localhost:5000/api/favoris/${user.id}`)
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
        poster={`http://localhost:5000/api/videos/${videoPlayed.img}`}
        height={250}
        width={300}
        type="video/mp4"
        src={`http://localhost:5000/api/videos/${selectedName}`}
      />
      <h2>{videoPlayed.name}</h2>
      <p className="date-video">{videoDate(videoPlayed)}</p>
      <p className="video-description">{videoPlayed.description}</p>
      <div className="interaction">
        <div className="category-play">
          <h3>Category</h3>
        </div>
        <div className="like-share">
          <button
            type="button"
            onClick={() => toggleFavorite(user.id, selectedId)}
          >
            <li
              className={
                favortieVideos.find((video) => video.id === selectedId)
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
