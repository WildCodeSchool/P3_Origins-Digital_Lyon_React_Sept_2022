import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import VideoPlayer from "./pages/VideoPlayer";
import FavPage from "./pages/FavPage";
import PlaylistPage from "./pages/PlaylistPage";
import Register from "./components/Register";
import { CurrentUserContextProvider } from "../contexts/userContext";
import Upload from "./components/Upload";
import "./style/index.css";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Library />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/myPlaylist" element={<PlaylistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<ProfilePage />} />
          <Route path="/player" element={<VideoPlayer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
