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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addFavorite = async (userId, videoId) => {
    try {
      if (!userId || !videoId) {
        throw new Error("userId and videoId are required");
      }
      if (typeof userId !== "number" || typeof videoId !== "number") {
        throw new Error("userId and videoId should be integers");
      }
      const response = await axios.post("http://localhost:5000/api/favoris", {
        user_id: userId,
        videos_id: videoId,
      });
      console.warn(response.data);
    } catch (err) {
      console.warn(err.message);
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
            onClick={() => addFavorite(user.id, selectedId)}
          >
            <li className="favorite" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
