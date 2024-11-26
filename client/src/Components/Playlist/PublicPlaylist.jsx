import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist';

const PublicPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/playlists/public');
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching public playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="public-playlists">
      <h2>Playlists Públicas</h2>
      {playlists.map(playlist => (
        <Playlist key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PublicPlaylists;
