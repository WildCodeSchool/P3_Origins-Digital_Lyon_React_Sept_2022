/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment-with-locales-es6";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [videos, setVideos] = useState([]);

  const [selectedName, setSelectedName] = useLocalStorage("videoName", "");
  const [selectedId, setSelectedId] = useLocalStorage("videoId", "");

  const videoDate = (video) =>
    moment(video.creation_date).locale("fr").fromNow();

  const values = {
    videos,
    setSelectedName,
    selectedName,
    selectedId,
    setSelectedId,
    videoDate,
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos`)
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
