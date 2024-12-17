import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../../Context/PlayerContext'; // Importa el contexto del reproductor
import './Songs.css'; // Importa los estilos CSS
import { FaPlay } from 'react-icons/fa'; // Importa el ícono de reproducción

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde el local storage
  const { playSong, setQueue } = useContext(PlayerContext); // Usa el contexto del reproductor

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/liked-songs`);
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    if (userId) {
      fetchLikedSongs();
    }
  }, [userId]);

  const handlePlaySong = (song, index) => {
    setQueue(songs, index); // Establece la cola de canciones y el índice actual
    playSong(song);
  };

  return (
    <div className="songs-container">
      <h2>Mis Canciones Favoritas</h2>
      <div className="songs-list">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div key={song._id} className="song-item">
              {/* Imagen de la canción */}
              <img
                src={`http://localhost:5000/uploads/${song.imagen_portada}`}
                alt={song.nombre}
                className="song-image"
              />
  
              {/* Información de la canción */}
              <div className="song-list">
                <h2>{song.nombre}</h2>
                <p>{song.artista_id.nombre_artistico}</p>
              </div>
  
              {/* Botón de reproducción */}
              <button
                className="play-button"
                onClick={() => handlePlaySong(song, index)}
              >
                <FaPlay /> {/* Ícono de reproducción */}
              </button>
            </div>
          ))
        ) : (
          <p>No tienes canciones favoritas aún.</p>
        )}
      </div>
    </div>
  );
  
};

export default Songs;
