import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtistDetail.css'
const ArtistDetail = () => {
  const { id } = useParams(); // Sólo usa artistId para obtener el parámetro de la URL
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]); // Cambio el nombre de setAlbum por setAlbums para coherencia
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    // Obtener detalles del artista
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artists/artists/${id}`);
        setArtist(response.data); // Detalles del artista
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    // Obtener álbumes del artista
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albums/artist/${id}`); // Cambié el endpoint a algo adecuado
        setAlbums(response.data); // Álbunes del artista
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    // Obtener canciones del artista
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/songs/artist/${id}`);
        setSongs(response.data); // Canciones del artista
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchArtist();
    fetchAlbums();
    fetchSongs();
  }, [id]);
  if (!artist) {
    return <p>Cargando detalles del artista...</p>;
  }
  return (
    <div className="artist-detail-container">
      <h1>{artist.nombre_artistico}</h1>
      <p>{artist.biografia}</p>
      <h2>Álbumes y Canciones</h2>
      <div className="content-row">
        <div className="albums-list">
          {albums.length > 0 ? (
            albums.map((album) => (
              <div key={album._id} className="album-item2">
                <img
                  src={`http://localhost:5000/uploads/${album.imagen_portada}`}
                  alt={album.nombre}
                  className="album-image2"
                />
                <p>{album.nombre}</p>
              </div>
            ))
          ) : (
            <p>No hay álbumes disponibles para este artista.</p>
          )}
        </div>
        
        <div className="songs-list2">
          {songs.length > 0 ? (
            songs.map((song) => (
              <div key={song._id} className="song-item2">
                <p>{song.nombre}</p>
              </div>
            ))
          ) : (
            <p>No hay canciones disponibles para este artista.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ArtistDetail;