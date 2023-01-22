import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";

function Home() {
  const [videoPromoted, setVideoPromoted] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/promote`)
      .then((response) => {
        setVideoPromoted(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
