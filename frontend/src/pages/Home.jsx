import React from "react";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";

function Home() {
  return (
    <div>
      <Navbar />
      <Carrousel />
      <div>
        <h3>Catégories</h3>
      </div>
    </div>
  );
}

export default Home;
