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
    audio: null,
  });
  const [albums, setAlbums] = useState([]); // Estado para almacenar los álbumes del artista

  useEffect(() => {
    const artistId = localStorage.getItem('artistId'); // Obtener el ID del artista desde el localStorage
    setFormData((prevData) => ({ ...prevData, artista_id: artistId }));

    // Obtener los álbumes del artista
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albums?artistId=${artistId}`);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    if (artistId) fetchAlbums();
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
      {/* Seleccionar álbum */}
      <select name="album_id" onChange={handleChange} value={formData.album_id}>
        <option value="">Selecciona un álbum</option>
        {albums.map(album => (
          <option key={album._id} value={album._id}>{album.nombre}</option>
        ))}
      </select>
      <input type="file" name="audio" accept="audio/*" onChange={handleChange} />
      <button type="submit">Subir Canción</button>
    </form>
  );
}

export default UploadSong;
