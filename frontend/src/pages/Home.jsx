import React from "react";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";

function Home() {
  return (
    <div>
      <Carrousel />
      <Carrousel />
      <Carrousel />
      <Carrousel />
      <Carrousel />
      <Carrousel />
      <div>
        <h3>Catégories</h3>
      </div>
      <Navbar />
    </div>
  );
}

export default Home;
