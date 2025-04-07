import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, Plus } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

function Songs() {
  const { isAuthenticated } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/songs');
      const data = await response.json();
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white">
        <p>Loading songs...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Songs</h2>
        {isAuthenticated && (
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Song</span>
          </button>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

function SongCard({ song }: { song: Song }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-purple-600 rounded-lg">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
          <p className="text-sm text-gray-500 mt-1">{song.duration}</p>
        </div>
      </div>
    </div>
  );
}

export default Songs;