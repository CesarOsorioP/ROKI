import React from 'react';
import Navbar from './Navbar';
import AlbumGrid from './AlbumGrid'; // Importa AlbumGrid solo una vez

import './Reproductor.css'; // Importa los estilos CSS

function Reproductor() {
  return (
    <div className="reproductor">
      <Navbar />
      <AlbumGrid /> {/* Muestra el componente AlbumGrid */}
      <div className="content">
        {/* Aquí puedes agregar más contenido */}
      </div>
    </div>
  );
}

export default Reproductor;
