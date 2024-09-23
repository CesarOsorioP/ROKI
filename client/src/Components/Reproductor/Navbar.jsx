import React from 'react';
import { FaHome, FaSearch, FaMusic, FaPlus, FaUser } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><FaUser /> Usuario</li>
        <li><FaHome /> Inicio</li>
        <li><FaSearch /> Explorar</li>
        <h2>MI MÚSICA</h2>
        <li><FaMusic /> Canción</li>
        <li><FaMusic /> Álbum</li>
        <li><FaMusic /> Artista</li>
        <li><FaMusic /> Playlists</li>
        <h2>LISTAS DE REPRODUCCIÓN</h2>
        <li><FaPlus /> Crear...</li>
      </ul>
    </nav>
  );
}

export default Navbar;
