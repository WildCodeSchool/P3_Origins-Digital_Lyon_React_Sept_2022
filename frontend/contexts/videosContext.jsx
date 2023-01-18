/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const values = {
    videos,
    setSelectedId,
    selectedId,
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
