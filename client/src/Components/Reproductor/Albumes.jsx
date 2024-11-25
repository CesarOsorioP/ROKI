import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Albumes.css'; // Asegúrate de crear un archivo CSS para los estilos

const Albumes = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/albums/all');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="albumes-container">
      <h1>Álbumes</h1>
      <div className="albumes-list">
        {albums.map(album => (
          <div key={album._id} className="album-item">
            <Link to={`/album/${album._id}`}>
              <img src={`http://localhost:5000/uploads/${album.imagen_portada}`} alt={album.nombre} className="album-image" />
              <h3>{album.nombre}</h3>
              <p>{album.artista_id.nombre_artistico}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Albumes;
