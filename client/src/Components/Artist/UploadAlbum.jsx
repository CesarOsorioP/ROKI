import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadAlbum.css';

function UploadAlbum() {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    fecha_publicacion: '',
    artista_id: '',
    imagen: null,
  });

  useEffect(() => {
    const artistId = localStorage.getItem('artistId'); // Obtener el ID del artista desde el localStorage
    setFormData((prevData) => ({ ...prevData, artista_id: artistId }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Asume que el token se almacena en localStorage
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/upload/album', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading album:', error);
    }
  };

  return (
    <div className="upload-album-container">
      <form onSubmit={handleSubmit} className="upload-album-form" encType="multipart/form-data">
        <h2 className="upload-album-title">Crear álbum</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del álbum"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="date"
          name="fecha_publicacion"
          onChange={handleChange}
          className="form-input"
        />
        <div className="file-upload-container">
          <label htmlFor="imagen" className="file-label">
            Subir imagen
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-btn">Crear</button>
      </form>
    </div>
  );
}

export default UploadAlbum;
