import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FaPlay, FaTrashAlt } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import "./UserPlaylists.css";
import { PlayerContext } from '../../Context/PlayerContext';

const UserPlaylists = () => {
  const [username, setUsername] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Playlist seleccionada
  const [songs, setSongs] = useState([]); // Canciones de la playlist seleccionada
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { playSong, setQueue } = useContext(PlayerContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/playlists/user/${userId}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [userId]);

  const handleCreatePlaylist = () => {
    navigate("/create-playlist"); // Redirige al formulario de creación de playlists
  };

  const handleSelectPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist);
  
    try {
      const response = await axios.get(
        `http://localhost:5000/api/playlists/${playlist._id}/songs`
      );
      setSongs(response.data); // Guarda las canciones obtenidas en el estado
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
    }
  };
  
  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:5000/api/playlists/${playlistId}`);
      setPlaylists(playlists.filter((playlist) => playlist._id !== playlistId));
      if (selectedPlaylist && selectedPlaylist._id === playlistId) {
        setSelectedPlaylist(null);
        setSongs([]); // Limpiar las canciones de la playlist eliminada
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handlePlaySong = (song, index) => {
    setQueue(songs, index);
    playSong(song);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="create-playlist" onClick={handleCreatePlaylist}>
          <MdCreateNewFolder />
          Crear playlist
        </button>
        <div className="playlist-list">
          <h2>Mis Playlists</h2>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="playlist-item"
                onClick={() => handleSelectPlaylist(playlist)}
              >
                <span>{playlist.nombre}</span>
                <div className="playlist-actions">
                  <FaPlay
                    title="Reproducir"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Reproduciendo playlist:", playlist.nombre);
                    }}
                  />
                  <FaTrashAlt
                    title="Eliminar"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlaylist(playlist._id);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No tienes playlists disponibles.</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="principal-content">
        {selectedPlaylist ? (
          <>
            {/* Header de la Playlist */}
            <div className="playlist-info">
              {/* Imagen de portada */}
              {selectedPlaylist.imagen_portada ? (
                <img
                  className="playlist-cover"
                  src={`http://localhost:5000/uploads/${selectedPlaylist.imagen_portada}`}
                  alt={`Portada de ${selectedPlaylist.nombre}`}
                />
              ) : (
                <div className="playlist-cover"></div>
              )}

              {/* Detalles de la playlist */}
              <div className="playlist-details">
                <p>Playlist: </p>
                <h1>{selectedPlaylist.nombre}</h1>
                <li>
                 {username ? `Usuario:  ${username}` : ""}
                </li>
              </div>

              {/* Botón de acción */}
              <button className="play-button">
                <FaPlay />
              </button>
            </div>

            {/* Lista de canciones en la playlist */}
            <div>
              {songs.length > 0 ? (
                songs.map((song, index) => (
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
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No hay canciones disponibles.</p>
              )}
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>Selecciona una playlist para verla.</p>
        )}
      </div>
    </div>
  );
};

export default UserPlaylists;
