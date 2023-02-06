import React from "react";

import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";
import SliderLastVideos from "../components/SliderLastVideos";
import SliderCategory from "../components/SliderCategory";
import test from "../asset/image/img1.png";

function Home({ setSelectedCategory }) {
  return (
    <div className="home-container">
      <Header />
      <div className="testctn">
        <img className="imgctn" src={test} alt="" />
      </div>
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
