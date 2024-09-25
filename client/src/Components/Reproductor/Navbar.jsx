// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic, FaPlus, FaUser } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/user"><FaUser /> Usuario</Link></li> {/* Enlace actualizado */}
        <li><Link to="/"><FaHome /> Inicio</Link></li>
        <li><Link to="/explore"><FaSearch /> Explorar</Link></li>
        <h2>MI MÚSICA</h2>
        <li><Link to="/songs"><FaMusic /> Canción</Link></li>
        <li><Link to="/albums"><FaMusic /> Álbum</Link></li>
        <li><Link to="/artists"><FaMusic /> Artista</Link></li>
        <li><Link to="/playlists"><FaMusic /> Playlists</Link></li>
        <li><Link to="/songs"><FaMusic /> Canción</Link></li>
        <li><Link to="/albums"><FaMusic /> Álbum</Link></li>
        <li><Link to="/artists"><FaMusic /> Artista</Link></li>
        <li><Link to="/playlists"><FaMusic /> Playlists</Link></li>
        <h2>LISTAS DE REPRODUCCIÓN</h2>
        <li><Link to="/create"><FaPlus /> Crear...</Link></li>
        <li><Link to="/create"><FaPlus /> Crear...</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
