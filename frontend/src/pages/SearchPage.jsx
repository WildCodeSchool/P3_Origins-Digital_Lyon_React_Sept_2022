import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <h1>Recherche</h1>
      <input
        type="text"
        placeholder="Que souhaitez vous regarder"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h2>Parcourir tout</h2>
      <div>{/* Il va y avoir le grid ici avec toutes les catégories */}</div>
      <div className="navPageContainer">
        <Navbar />
      </div>
    </div>
  );
}
