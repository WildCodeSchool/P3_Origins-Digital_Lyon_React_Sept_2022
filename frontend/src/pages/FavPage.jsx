import React, { useContext, useEffect, useState } from "react";
import VideoBox from "../components/VideoBox";
import ReturnPageButton from "../components/ReturnPageButton";
import CurrentUserContext from "../../contexts/userContext";

export default function FavPage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { user } = useContext(CurrentUserContext);
  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);
  return (
    <div className="favorite-page-container">
      <ReturnPageButton />

      <h2>My Favorites</h2>
      <div className="favorite-container">
        {favortieVideos.map((video) => (
          <div className="favorite-box" key={video.id}>
            <VideoBox video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}
