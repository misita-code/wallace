// src/components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/songs">Songs</Link> | 
      <Link to="/playlists">Playlists</Link> | 
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
