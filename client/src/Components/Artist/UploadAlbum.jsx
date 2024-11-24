import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input type="text" name="genero" placeholder="Género" onChange={handleChange} />
      <input type="date" name="fecha_publicacion" placeholder="Fecha de Publicación" onChange={handleChange} />
      <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
      <button type="submit">Subir Álbum</button>
    </form>
  );
}

export default UploadAlbum;
