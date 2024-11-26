import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playlist.css'; // Importa los estilos CSS

const Playlist = ({ playlist }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (playlist.canciones) {
      setSongs(playlist.canciones);
    }
  }, [playlist]);

  return (
    <div className="playlist-container">
      {playlist.imagen_portada ? (
        <img src={`http://localhost:5000/uploads/${playlist.imagen_portada}`} alt={playlist.nombre} className="playlist-image" />
      ) : (
        <div className="placeholder-image">No Image</div>
      )}
      <h2>{playlist.nombre}</h2>
      <p>{playlist.publica ? "Pública" : "Privada"}</p>
      <div className="songs-list">
        {songs.map(song => (
          <div key={song._id} className="song-item">
            <h3>{song.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
