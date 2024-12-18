import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../../Context/PlayerContext'; // Importa el contexto del reproductor
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'; // Importa el ícono de reproducción
import './AlbumGrid.css';

function AlbumGrid() {
  const [songs, setSongs] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  const { playSong, setQueue } = useContext(PlayerContext); // Usa el contexto del reproductor

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/songs/`); // Utiliza la ruta para obtener todas las canciones
        setSongs(response.data);

        // Seleccionar 4 canciones aleatorias
        const shuffledSongs = response.data.sort(() => 0.5 - Math.random());
        const selectedSongs = shuffledSongs.slice(0, 4);
        setRandomSongs(selectedSongs);
      } catch (error) {
        console.error('Error fetching all songs:', error);
      }
    };

    fetchAllSongs();
  }, []);

  const handlePlaySong = (song, index) => {
    setQueue(randomSongs, index); // Establece la cola de canciones y el índice actual
    playSong(song);
  };

  return (
    <div className="album-grid">
      <h2 className="album-grid">CANCIONES RECOMENDADAS</h2>
      <div className="album-grid-container">
        {randomSongs.map((song, index) => (
          <div className="album-item" key={song._id}>
            <Link to={`/songs/${song.nombre.toLowerCase().replace(/\s+/g, '-')}`}>
              <img
                className="album-image"
                src={`http://localhost:5000/uploads/${song.imagen_portada}`} // Construye la ruta completa de la imagen
                alt={song.nombre}
              />
            </Link>
            <div className="album-info">
              <h3>{song.nombre}</h3>
              <p className="artist-name">{song.artista_id?.nombre_artistico}</p> {/* Mostrar el nombre del artista */}
              <button
                className="play-button"
                onClick={() => handlePlaySong(song, index)}
              >
                <FaPlay /> {/* Ícono de reproducción */}
              </button> {/* Botón para reproducir la canción */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;
