/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);

  const value = { videos, setVideos, index, setIndex };

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
