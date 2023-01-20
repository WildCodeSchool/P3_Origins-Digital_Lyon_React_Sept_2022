import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserContextProvider } from "../contexts/userContext";
import { CurrentVideosContextProvider } from "../contexts/videosContext";
import Routing from "./components/Routing";

import "./style/index.css";

function App() {
  return (
    <Router>
      <CurrentVideosContextProvider>
        <CurrentUserContextProvider>
          <Routing />
        </CurrentUserContextProvider>
      </CurrentVideosContextProvider>
    </Router>
  );
}

export default App;
