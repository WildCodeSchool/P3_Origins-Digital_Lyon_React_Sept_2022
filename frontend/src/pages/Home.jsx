import React from "react";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";
import Header from "@components/Header";


function Home() {
  return (
    <div>
      <Header />
      <Carrousel />
      <Slider />
      <Slider />
      <Slider />
      <Navbar />
    </div>
  );
}

export default Home;
