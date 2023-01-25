import React from "react";

import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";
import SliderLastVideos from "../components/SliderLastVideos";
import SliderCategory from "../components/SliderCategory";

function Home({ setSelectedCategory }) {
  return (
    <div className="home-container">
      <Header />
      <Carrousel />
      <SliderCategory setSelectedCategory={setSelectedCategory} />
      <SliderLastVideos />
      <Slider />
      <Navbar />
      <ToastContainer />
    </div>
  );
}

export default Home;
