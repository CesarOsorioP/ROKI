import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist'; // Asegúrate de tener el componente Playlist
import './UserPlaylists.css'; //

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde el localStorage

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/playlists/user/${userId}`);
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [userId]);

  return (
    <div className="user-playlists">
      <h2>Mis Playlists</h2>
      {playlists.length > 0 ? (
        playlists.map(playlist => (
          <Playlist key={playlist._id} playlist={playlist} />
        ))
      ) : (
        <p>No tienes playlists disponibles.</p>
      )}
    </div>
  );
};

export default UserPlaylists;
