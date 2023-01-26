import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import CurrentVideosContext from "../../contexts/videosContext";
import Navbar from "../components/Navbar";
import VideoBox from "../components/VideoBox";

export default function SearchPage({ selectedCategory, setSelectedCategory }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const { videos } = useContext(CurrentVideosContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category/`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, []);
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
      <form className="center">
        <label htmlFor="category-select">
          Filtrer par catégorie{" "}
          <select
            id="category-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">---</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </form>
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
            {videos
              .filter(
                (video) =>
                  selectedCategory.length === 0 ||
                  String(video.category_id) === selectedCategory
              )
              .map((video) => {
                return <VideoBox video={video} key={video.id} />;
              })}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}
