import React, { useEffect, useState, useRef, useContext} from 'react';
import axios from 'axios';
import './Canciones.css'; // Asegúrate de tener un archivo CSS para estilos
import { FaPlay } from 'react-icons/fa';
import { PlayerContext } from '../../Context/PlayerContext';

const Canciones = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRefs = useRef([]);
  const { playSong, setQueue } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/songs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Hubo un error al cargar las canciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlay = (index) => {
    audioRefs.current[index].play();
  };

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handlePlaySong = (song, index) => {
    setQueue(songs, index);
    playSong(song);
  }

  return (
    <div>
      <h1>Canciones</h1>
      <div className="songs-list">
        {songs.map((song, index) => (
          <div key={song._id} className="song-item">
            {/* Imagen de portada */}
            <img
              src={`http://localhost:5000/uploads/${song.imagen_portada}`}
              alt={song.nombre}
              className="song-image"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'; // Imagen de respaldo si falla
                e.target.alt = 'Imagen no disponible';
              }}
            />
            {/* Nombre de la canción */}
            <h2>{song.nombre}</h2>
            {/* Nombre del artista */}
            <p>{song.artista_id ? song.artista_id.nombre_artistico : 'Artista desconocido'}</p>
            {/* Botón para reproducir la canción */}
            <button className="play-button" onClick={() => handlePlaySong(song, index)}>
              <FaPlay />
            </button>
            {/* Reproductor de audio */}
           
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Canciones;
