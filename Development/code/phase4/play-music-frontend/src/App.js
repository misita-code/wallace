// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SongsPage from './pages/SongsPage';
import PlaylistsPage from './pages/PlaylistsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
