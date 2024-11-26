import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePlaylist = () => {
  const [nombre, setNombre] = useState('');
  const [publica, setPublica] = useState(true);
  const [imagenPortada, setImagenPortada] = useState(null);
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde el local storage

  useEffect(() => {
    console.log("User ID:", userId); // Verificar el ID del usuario
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('usuario_id', userId); // Asegúrate de que userId es válido
    formData.append('publica', publica);
    if (imagenPortada) {
      formData.append('imagen_portada', imagenPortada);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/playlists/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Playlist created:', response.data);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-playlist-form">
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="publica">Pública:</label>
        <input
          type="checkbox"
          id="publica"
          checked={publica}
          onChange={(e) => setPublica(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="imagenPortada">Imagen de portada:</label>
        <input
          type="file"
          id="imagenPortada"
          accept="image/*"
          onChange={(e) => setImagenPortada(e.target.files[0])}
        />
      </div>
      <button type="submit">Crear Playlist</button>
    </form>
  );
};

export default CreatePlaylist;