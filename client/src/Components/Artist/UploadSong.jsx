import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadSong() {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    duracion: '',
    fecha_publicacion: '',
    album_id: '',
    artista_id: '', // Incluye el artista_id aquí
    imagen: null,
    audio: null,
  });

  useEffect(() => {
    const artistId = localStorage.getItem('artistId'); // Obtener el ID del artista desde el localStorage
    console.log('Artist ID from localStorage:', artistId); // Verificar el valor
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
      const response = await axios.post('http://localhost:5000/api/upload/song', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading song:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input type="text" name="genero" placeholder="Género" onChange={handleChange} />
      <input type="number" name="duracion" placeholder="Duración" onChange={handleChange} />
      <input type="date" name="fecha_publicacion" placeholder="Fecha de Publicación" onChange={handleChange} />
      <input type="text" name="album_id" placeholder="Album ID (opcional)" onChange={handleChange} />
      <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
      <input type="file" name="audio" accept="audio/*" onChange={handleChange} />
      <button type="submit">Subir Canción</button>
    </form>
  );
}

export default UploadSong;
