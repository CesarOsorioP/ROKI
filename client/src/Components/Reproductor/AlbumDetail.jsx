import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumResponse = await axios.get(`http://localhost:5000/api/albums/${id}`);
        setAlbum(albumResponse.data);
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    const fetchSongs = async () => {
      try {
        const songsResponse = await axios.get(`http://localhost:5000/api/songs/album/${id}`);
        setSongs(songsResponse.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAlbum();
    fetchSongs();
  }, [id]);

  if (!album) {
    return <p>Cargando álbum...</p>;
  }

  return (
    <div className="album-detail-container">
      <img src={`http://localhost:5000/uploads/${album.imagen_portada}`} alt={album.nombre} className="album-image" />
      <h1>{album.nombre}</h1>
      <p>{album.artista_id.nombre_artistico}</p>
      <div className="songs-list">
        <h2>Canciones</h2>
        {songs.map(song => (
          <div key={song._id} className="song-item">
            <h3>{song.nombre}</h3>
            <audio controls src={`http://localhost:5000/uploads/${song.enlace_cancion}`}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetail;
