import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";

function Home() {
  return (
    <div className="home-container">
      <Header />
      <Carrousel />
      <Slider />
      <Slider />
      <Slider />
      <Navbar />
      <ToastContainer />
    </div>
  );
}

export default Home;
