import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);

  return (
    <CurrentVideosContext.Provider value={{ videos, setVideos }}>
      {children}
    </CurrentVideosContext.Provider>
  );
}

CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
