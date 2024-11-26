import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadSong.css'; // Asegúrate de incluir tu archivo CSS

function UploadSong() {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    duracion: '',
    fecha_publicacion: '',
    album_id: '',
    artista_id: '',
    audio: null,
  });
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]); // Estado para almacenar canciones del artista
  const artistId = localStorage.getItem('artistId'); // Obtener el ID del artista desde localStorage

  // Cargar álbumes del artista al montar el componente
  useEffect(() => {
    const artistId = localStorage.getItem('artistId'); // Obtener el ID del artista desde el localStorage
    setFormData((prevData) => ({ ...prevData, artista_id: artistId }));

    // Obtener los álbumes del artista
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albums/artist?artistId=${artistId}`);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/songs/artist/${artistId}`);
        setSongs(response.data); // Cargar solo canciones del artista
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAlbums();
    fetchSongs();
  }, [artistId]); // Ejecutar nuevamente si el artistId cambia

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Subir canción
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/upload/song', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Canción subida:', response.data);
      alert('Canción subida exitosamente.');
      // Actualizar lista de canciones tras subir una nueva
      setSongs((prevSongs) => [...prevSongs, response.data]);
    } catch (error) {
      console.error('Error uploading song:', error);
      alert('Hubo un problema al subir la canción.');
    }
  };

  // Eliminar canción
  const handleDelete = async (songId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta canción?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/songs/${songId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== songId)); // Actualizar estado
      alert('Canción eliminada exitosamente.');
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Hubo un problema al eliminar la canción.');
    }
  };

  return (
    <div className="page-container">
      {/* Contenedor para subir canciones */}
      <div className="upload-song-container">
        <h2>Subir Canción</h2>
        <form onSubmit={handleSubmit} className="upload-song-form" encType="multipart/form-data">
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} className="form-input" />
          <input type="text" name="genero" placeholder="Género" onChange={handleChange} className="form-input" />
          <input type="number" name="duracion" placeholder="Duración" onChange={handleChange} className="form-input" />
          <input type="date" name="fecha_publicacion" placeholder="Fecha de Publicación" onChange={handleChange} className="form-input" />
          <select name="album_id" onChange={handleChange} value={formData.album_id} className="form-input">
            <option value="">Selecciona un álbum</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>{album.nombre}</option>
            ))}
          </select>
          <input type="file" name="audio" accept="audio/*" onChange={handleChange} className="file-input" />
          <button type="submit" className="submit-btn">Subir Canción</button>
        </form>
      </div>
  
      {/* Contenedor para eliminar canciones */}
      <div className="delete-song-container">
        <h2>Eliminar Canción</h2>
        {songs.length === 0 ? (
          <p>No hay canciones disponibles.</p>
        ) : (
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song._id} className="song-item">
                <span>{song.nombre} - {song.genero}</span>
                <button className="delete-btn" onClick={() => handleDelete(song._id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  
}

export default UploadSong;
