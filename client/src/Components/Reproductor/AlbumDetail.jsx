import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../Context/PlayerContext';
import './AlbumDetail.css';
import LikeButton from './LikeButton';
import { FaPlay } from 'react-icons/fa';

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const { playSong, setQueue } = useContext(PlayerContext);
  const userId = localStorage.getItem('userId');

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

  const handlePlaySong = (song, index) => {
    setQueue(songs, index);
    playSong(song);
  };

  return (
    <div className="album-detail-container">
      <div className="album-header">
        <img src={`http://localhost:5000/uploads/${album.imagen_portada}`} alt={album.nombre} className="album-image" />
        <div className="album-details">
          <h1>{album.nombre}</h1>
          <p>{album.artista_id.nombre_artistico}</p>
        </div>
      </div>
      <div className="songs-list">
        <h2>Canciones</h2>
        {songs.map((song, index) => (
          <div key={song._id} className="song-item">
            <div className="song-info">
              <h3>{song.nombre}</h3>
            </div>
            <button className="play-button" onClick={() => handlePlaySong(song, index)}>
              <FaPlay />
            </button>
            <LikeButton userId={userId} songId={song._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
