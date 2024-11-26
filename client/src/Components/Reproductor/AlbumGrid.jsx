import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './AlbumGrid.css';

function AlbumGrid() {
  // Datos de ejemplo para los álbumes con nombre de artista
  const albums = [
    {
      id: 1,
      name: 'Ameri',
      artist_name: 'Duki', // Nombre del artista
      image: '/uploads/song1.png', // Ruta relativa a la carpeta 'public'
    },
    {
      id: 2,
      name: 'BROWN BOY',
      artist_name: 'ABHIR', // Nombre del artista
      image: '/uploads/album2.jpg',
    },
    {
      id: 3,
      name: 'DATA',
      artist_name: 'Tainy', // Nombre del artista
      image: '/uploads/album3.jpg',
    },
    {
      id: 4,
      name: 'KIDS SEE GHOSTS',
      artist_name: 'Kids See Ghosts', // Nombre del artista
      image: '/uploads/album4.jpg',
    },
    {
      id: 5,
      name: 'Random Access Memories',
      artist_name: 'Daft Punk', // Nombre del artista
      image: '/uploads/album5.jpg',
    },
  ];

  return (
    <div className="album-grid">
      <h2 className=' album-grid'>ALBUMES RECOMENDADOS</h2>
      <div className="album-grid-container">
        {albums.map((album) => (
          <div className="album-item" key={album.id}>
            <Link to={`/albumes/${album.name.toLowerCase().replace(/\s+/g, '-')}`}>
              {/* Esto creará una URL amigable, como /albumes/vida-de-rock */}
              <img
                className="album-image"
                src={album.image}  // Usar la ruta correcta dentro de 'public'
                alt={album.name}
              />
            </Link>
            <div className="album-info">
              <h3>{album.name}</h3>
              <p className="artist-name">{album.artist_name}</p> {/* Mostrar el nombre del artista */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;
