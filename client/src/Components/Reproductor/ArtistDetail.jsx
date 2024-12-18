import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistDetail = () => {
  const { artistId } = useParams(); // Sólo usa artistId para obtener el parámetro de la URL
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]); // Cambio el nombre de setAlbum por setAlbums para coherencia
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Obtener detalles del artista
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artists/artists/${artistId}`);
        setArtist(response.data); // Detalles del artista
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    // Obtener álbumes del artista
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albums/artist/${artistId}`); // Cambié el endpoint a algo adecuado
        setAlbums(response.data); // Álbunes del artista
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    // Obtener canciones del artista
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/songs/artist/${artistId}`);
        setSongs(response.data); // Canciones del artista
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchArtist();
    fetchAlbums();
    fetchSongs();
  }, [artistId]);

  if (!artist) {
    return <p>Cargando detalles del artista...</p>;
  }

  return (
    <div className="artist-detail-container">
      <h1>{artist.nombre_artistico}</h1>
      <img 
        src={`http://localhost:5000/uploads/${artist.imagen}`} 
        alt={artist.nombre_artistico} 
        className="artist-image" 
      />
      <p>{artist.biografia}</p>

      <h2>Álbumes</h2>
      <div className="albums-list">
        {albums.length > 0 ? (
          albums.map(album => (
            <div key={album._id} className="album-item">
              <img 
                src={`http://localhost:5000/uploads/${album.imagen_portada}`} 
                alt={album.nombre} 
                className="album-image" 
              />
              <p>{album.nombre}</p>
            </div>
          ))
        ) : (
          <p>No hay álbumes disponibles para este artista.</p>
        )}
      </div>

      <h2>Canciones</h2>
      <div className="songs-list">
        {songs.length > 0 ? (
          songs.map(song => (
            <div key={song._id} className="song-item">
              <p>{song.nombre}</p>
            </div>
          ))
        ) : (
          <p>No hay canciones disponibles para este artista.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
