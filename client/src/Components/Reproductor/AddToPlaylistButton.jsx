import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddToPlaylistButton = ({ userId, songId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/playlists/user/${userId}`);
        setPlaylists(response.data);
      } catch (err) {
        console.error('Error fetching playlists:', err);
      }
    };

    if (userId) fetchPlaylists();
  }, [userId]);

  const handleAddSong = async () => {
    if (!selectedPlaylist) {
      alert('Por favor selecciona una playlist');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/playlists/add/${selectedPlaylist}/${songId}`);
      alert('Canción añadida a la playlist correctamente');
    } catch (err) {
      console.error('Error adding song to playlist:', err);
      setError(err.response?.data?.message || 'Error adding song');
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedPlaylist(e.target.value)} value={selectedPlaylist}>
        <option value="">Selecciona una playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.nombre}
          </option>
        ))}
      </select>
      <button onClick={handleAddSong}>Añadir a Playlist</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddToPlaylistButton;
