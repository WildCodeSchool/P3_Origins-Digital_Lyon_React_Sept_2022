/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [vid, setVid] = useState({});
  const [index, setIndex] = useState(0);

  axios
    .get("http://localhost:5000/api/videos")
    .then((vids) => setVideos(vids.data));

  const value = { videos, setVideos, index, setIndex, vid, setVid };

  const valueMemo = useMemo(() => value);

  return (
    <CurrentVideosContext.Provider value={valueMemo}>
      {children}
    </CurrentVideosContext.Provider>
  );
}

CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
