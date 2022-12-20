import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";

function Home() {
  return (
    <div>
      <Header />
      <div className="titreNews">
        <h2>NOUVELLES VIDEOS</h2>
      </div>
      <Carrousel />
      <Slider />
      <Slider />
      <Slider />
      <Navbar />
    </div>
  );
}

export default Home;
