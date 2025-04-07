import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { List, Plus, Trash2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Playlist {
  id: number;
  name: string;
  song_count: number;
}

const playlistSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Playlist name must be at least 3 characters')
    .required('Playlist name is required'),
});

function Playlists() {
  const { isAuthenticated, user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, [isAuthenticated]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:5000/playlists', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setPlaylists(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (values: { name: string }, { setSubmitting, resetForm }: any) => {
    try {
      const response = await fetch('http://localhost:5000/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        await fetchPlaylists();
        setShowCreateForm(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
    setSubmitting(false);
  };

  const handleDeletePlaylist = async (playlistId: number) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) return;

    try {
      const response = await fetch(`http://localhost:5000/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        await fetchPlaylists();
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center text-white">
        <p>Please login to view and manage your playlists.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-white">
        <p>Loading playlists...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Your Playlists</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Playlist</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Formik
            initialValues={{ name: '' }}
            validationSchema={playlistSchema}
            onSubmit={handleCreatePlaylist}
          >
            {({ isSubmitting }) => (
              <Form className="flex items-center space-x-4">
                <div className="flex-1">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Playlist name"
                    className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onDelete={() => handleDeletePlaylist(playlist.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PlaylistCard({ playlist, onDelete }: { playlist: Playlist; onDelete: () => void }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-600 rounded-lg">
            <List className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
            <p className="text-sm text-gray-400">{playlist.song_count} songs</p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Playlists;