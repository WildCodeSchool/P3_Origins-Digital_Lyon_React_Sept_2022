/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [selectedName, setSelectedName] = useLocalStorage("videoName", "");
  const [selectedId, setSelectedId] = useLocalStorage("videoId", "");

  const values = {
    videos,
    setSelectedName,
    selectedName,
    selectedId,
    setSelectedId,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CurrentVideosContext.Provider value={values}>
      {children}
    </CurrentVideosContext.Provider>
  );
}
CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
