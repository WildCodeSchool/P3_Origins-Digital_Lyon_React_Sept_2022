import React, { useContext, useEffect, useState } from "react";
import VideoBox from "../components/VideoBox";
import ReturnPageButton from "../components/ReturnPageButton";
import CurrentUserContext from "../../contexts/userContext";

export default function FavPage() {
  const { user } = useContext(CurrentUserContext);
  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);
  return (
    <div>
      <div className="returnContainer">
        <ReturnPageButton />
      </div>
      <h2>My Favorites</h2>
      <div className="listContainer">
        {favortieVideos.map((video) => (
          <VideoBox video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
}
