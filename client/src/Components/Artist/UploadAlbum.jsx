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
  const [albums, setAlbums] = useState([]);
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

    fetchAlbums();
  }, [artistId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Subir álbum
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
      const response = await axios.post('http://localhost:5000/api/upload/album', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert('Álbum creado exitosamente.');
      // Actualizar lista de álbumes tras crear uno nuevo
      setAlbums((prevAlbums) => [...prevAlbums, response.data]);
    } catch (error) {
      console.error('Error uploading album:', error);
    }
  };

  // Eliminar álbum
  const handleDelete = async (albumId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este álbum?');
    if (!confirmDelete) return;
    console.log('ID del álbum a eliminar:', albumId);

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album._id !== albumId)); // Actualizar estado
      alert('Álbum eliminado exitosamente.');
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Hubo un problema al eliminar el álbum.');
    }
  };

  return (
    <div className="page-container">
      <div className="upload-delete-container">
        {/* Contenedor para crear álbum */}
        <div className="upload-album-container">
          <h2 className="upload-album-title">Crear álbum</h2>
          <form onSubmit={handleSubmit} className="upload-album-form" encType="multipart/form-data">
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
  
        {/* Sección para eliminar álbumes */}
        <div className="delete-album-container">
          <h2>Eliminar Álbum</h2>
          {albums.length === 0 ? (
            <p>No hay álbumes disponibles.</p>
          ) : (
            <ul className="album-list">
              {albums.map((album) => (
                <li key={album._id} className="album-item-2">
                  <span>{album.nombre}</span>
                  <button className="delete-btn" onClick={() => handleDelete(album._id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  
  
}

export default UploadAlbum;
