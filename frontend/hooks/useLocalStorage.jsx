import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // On recup la valeur dans le localstorage
  const saved = localStorage.getItem(key);
  // on la convertis
  const initial = JSON.parse(saved);
  // on renvoit soit la valeur convertis, soit la valeur donnée par defaut.
  return initial || defaultValue;
}

const useLocalStorage = (key, defaultValue) => {
  // Le hook personnalisé gère une value et son seteur.
  // La valeur par defaut est le resultat d'une fonction (plus haut)
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Au lancement, soit on a récupéré une valeur et on l'enregistre
    // soit on stocke une valeur par defaut
    localStorage.setItem(key, JSON.stringify(value));
    // si la valeur, on met à jour le local storage
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
