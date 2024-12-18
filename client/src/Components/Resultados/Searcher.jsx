import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Pagos/card.jsx";
import "./searcher.css";
import SearcherComponent from "./searcherinput.jsx";
import { PlayerContext } from '../../Context/PlayerContext';
import { FaPlay } from 'react-icons/fa';

const Search = () => {
   const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1); // Navega al estado anterior
    };
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const { playSong, setQueue } = useContext(PlayerContext);

  const genres = ["Pop", "Rock", "Hip-hop", "Jazz", "Reggaeton"]; // Géneros disponibles

  // Fetch de resultados iniciales
  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/songs/explore?search=${query}`);
        const songsData = response.ok ? await response.json() : [];
        setSongs(songsData);
        setError(null);
      } catch (err) {
        console.error("Error al obtener los resultados:", err);
        setError("Error al obtener los resultados. Por favor, intenta nuevamente.");
      }
    };

    if (query) fetchResultados();
  }, [query]);

  // Fetch de canciones filtradas por género
  const fetchSongsByGenre = async (genre) => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/genre/${genre}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredSongs(data);
        setError(null);
      } else {
        setFilteredSongs([]);
        setError("No se encontraron canciones para este género.");
      }
    } catch (err) {
      console.error("Error al filtrar por género:", err);
      setError("Error al filtrar por género. Por favor, intenta nuevamente.");
    }
  };

  const handlePlaySong = (song, index) => {
    setQueue(filteredSongs.length > 0 ? filteredSongs : songs, index);
    playSong(song);
  };

  return (
    <Card>
      <div className="divprime">
      <div onClick={handleBack} className="back-button2">
        volver
      </div>
        <SearcherComponent />
        <div className="title">
          <h2>Resultados que concuerdan con: {query}</h2>
        </div>

        <div className="genre-buttons">
          <h3>Filtrar por género:</h3>
          {genres.map((genre) => (
            <button 
              key={genre} 
              onClick={() => fetchSongsByGenre(genre)}
              className="genre-button"
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="splitsearcher">
          {error && <p className="error">{error}</p>}

          <div className="grid">
            {(filteredSongs.length > 0 ? filteredSongs : songs).map((song, index) => (
              <div key={song._id} className="song-card">
                <img
                  src={`http://localhost:5000/uploads/${song.imagen_portada}`}
                  alt={song.nombre}
                  className="song-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                    e.target.alt = 'Imagen no disponible';
                  }}
                />
                <div className="song-details">
                  <h4>{song.nombre}</h4>
                  <p>{song.artista_id ? song.artista_id.nombre_artistico : 'Artista desconocido'}</p>
                  <button 
                    className="play-button" 
                    onClick={() => handlePlaySong(song, index)}
                  >
                    <FaPlay /> Reproducir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Search;