import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import ReturnPageButton from "../components/ReturnPageButton";
import CurrentVideosContext from "../../contexts/videosContext";
import Navbar from "../components/Navbar";
import VideoBox from "../components/VideoBox";

export default function SearchPage({ selectedCategory, setSelectedCategory }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const { videos, setVideos } = useContext(CurrentVideosContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category/`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, [setVideos]);
  return (
    <>
      <ReturnPageButton />
      <div className="pageContainer">
        <h2>Recherche</h2>
        <form className="center">
          <input
            className="search"
            type="text"
            placeholder="Rechercher"
            minLength={2}
            maxLength={100}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label htmlFor="category-select">
            <select
              id="category-select"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" className="options">
                Catégorie
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="item">
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </form>
        <div>
          <h2 className="little-title">Parcourir tout </h2>
        </div>
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
    </>
  );
}
