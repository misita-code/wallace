import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Music, PlayCircle, User, List } from 'lucide-react';
import Home from './pages/Home';
import Playlists from './pages/Playlists';
import Songs from './pages/Songs';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
          <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="flex items-center space-x-2">
                  <PlayCircle className="w-8 h-8 text-purple-400" />
                  <span className="text-xl font-bold text-white">PlayMusic</span>
                </Link>
                <div className="flex space-x-4">
                  <NavLink to="/" icon={<Music />}>Home</NavLink>
                  <NavLink to="/playlists" icon={<List />}>Playlists</NavLink>
                  <NavLink to="/songs" icon={<Music />}>Songs</NavLink>
                  <NavLink to="/login" icon={<User />}>Login</NavLink>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-800 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export default App;