// src/pages/SongsPage.js
import { useEffect, useState } from 'react';
import SongForm from '../forms/SongForm';

function SongsPage() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then(res => res.json())
      .then(setSongs);
  }, []);

  return (
    <div>
      <h2>All Songs</h2>
      <ul>
        {songs.map(song => (
          <li key={song.id}>{song.title} - {song.artist} ({song.duration})</li>
        ))}
      </ul>
      <SongForm />
    </div>
  );
}

export default SongsPage;
