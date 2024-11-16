import React, { useState } from 'react';
import axios from 'axios';
import './UploadSong.css';

const UploadSong = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    duracion: '',
    fecha_publicacion: '',
    album_id: '',  // ID del álbum opcional
  });
  const [imagen, setImagen] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('genero', formData.genero);
    data.append('duracion', formData.duracion);
    data.append('fecha_publicacion', formData.fecha_publicacion);
    if (formData.album_id) data.append('album_id', formData.album_id);
    if (imagen) data.append('imagen', imagen);
    if (audio) data.append('audio', audio);

    // Obtener el ID del artista desde el localStorage
    const artistaId = localStorage.getItem('artistaId');
    if (artistaId) {
      data.append('artista_id', artistaId); // Envía el ID del artista
    }

    try {
      const response = await axios.post('http://localhost:5000/api/upload/song', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error); // Log de error
      setMessage('Error al subir la canción');
    }
  };

  return (
    <div className="upload-song-container">
      <h2>Subir Canción</h2>
      <form className="upload-song-form" onSubmit={handleSubmit}>
        <input 
          className="form-input"
          type="text" 
          name="nombre" 
          placeholder="Nombre de la Canción" 
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-input"
          type="text" 
          name="genero" 
          placeholder="Género" 
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-input"
          type="number" 
          name="duracion" 
          placeholder="Duración (segundos)" 
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-input"
          type="date" 
          name="fecha_publicacion" 
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-input"
          type="text" 
          name="album_id" 
          placeholder="ID del Álbum (opcional)" 
          onChange={handleChange} 
        />
        <input 
          className="file-input"
          type="file" 
          name="imagen" 
          onChange={handleImageChange} 
          accept="image/*" 
          required 
        />
        <input 
          className="file-input"
          type="file" 
          name="audio" 
          onChange={handleAudioChange} 
          accept="audio/*" 
          required 
        />
        <button className="submit-btn" type="submit">Subir Canción</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadSong;
