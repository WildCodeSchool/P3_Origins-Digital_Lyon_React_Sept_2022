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
      <Navbar />
    </div>
  );
}

export default Home;
