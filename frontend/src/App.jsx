import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserContextProvider } from "../contexts/userContext";
import Routing from "./components/Routing";

import "./style/index.css";

function App() {
  return (
    <Router>
      <CurrentUserContextProvider>
        <Routing />
      </CurrentUserContextProvider>
    </Router>
  );
}

export default App;
