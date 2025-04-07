import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PlayCircle } from 'lucide-react';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <PlayCircle className="w-24 h-24 text-purple-400 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-6">
          {isAuthenticated ? `Welcome back, ${user.username}!` : 'Welcome to PlayMusic'}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your personal music library where you can create playlists and discover new songs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="Create Playlists"
            description="Organize your favorite songs into custom playlists"
          />
          <Feature
            title="Discover Music"
            description="Browse through our extensive collection of songs"
          />
          <Feature
            title="Share & Connect"
            description="Share your playlists with friends and discover their music taste"
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default Home;