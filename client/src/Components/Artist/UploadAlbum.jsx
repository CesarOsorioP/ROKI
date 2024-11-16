import React, { useState } from 'react';
import axios from 'axios';
import './UploadAlbum.css';

const UploadAlbum = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    fecha_publicacion: '',
    tipo: 'album',  // Puede ser "album" o "ep"
  });
  const [imagen, setImagen] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('genero', formData.genero);
    data.append('fecha_publicacion', formData.fecha_publicacion);
    data.append('tipo', formData.tipo);
    if (imagen) data.append('imagen', imagen);

    try {
      const response = await axios.post('api/upload/album', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al subir el álbum');
    }
  };

  return (
    <div className="upload-album-container">
      <h2>Subir Álbum</h2>
      <form className="upload-album-form" onSubmit={handleSubmit}>
        <input 
          className="form-input"
          type="text" 
          name="nombre" 
          placeholder="Nombre del Álbum" 
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
          type="date" 
          name="fecha_publicacion" 
          onChange={handleChange} 
          required 
        />
        <input 
          className="file-input"
          type="file" 
          name="imagen" 
          onChange={handleFileChange} 
          accept="image/*" 
          required 
        />
        <button className="submit-btn" type="submit">Subir Álbum</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadAlbum;
