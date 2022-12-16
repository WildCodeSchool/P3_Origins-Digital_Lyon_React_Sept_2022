import React from "react";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";

function Home() {
  return (
    <div>
      <Carrousel />
      <Slider />
      <Slider />
      <Slider />
      <div>
        <h3>Catégories</h3>
      </div>
      <Navbar />
    </div>
  );
}

export default Home;
