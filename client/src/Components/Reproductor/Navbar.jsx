// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic, FaPlus, FaUser, FaCog } from 'react-icons/fa';
import './Navbar.css';
import SelectButton from "../Pagos/SelectButton";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [userType, setUserType] = useState(null); // Estado para el tipo de usuario
  const [isVisible, setIsVisible] = useState(true); // Estado para mostrar/ocultar el contenido
  const navigate = useNavigate();

  // Obtener el nombre y tipo de usuario al cargar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedType = localStorage.getItem('userType'); // Asume que guardas 'userType' en localStorage
    if (storedUser) setUsername(storedUser);
    if (storedType) setUserType(storedType);
  }, []);

  // Manejo de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    setUsername(null);
    setUserType(null);
    navigate('/login');
  };

  // Función para alternar visibilidad
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      {/* Botón para ocultar/mostrar el contenido */}
      <div>
        <SelectButton
          className = "buttoncss"
          text={isVisible ? "Ocultar menú" : "Mostrar menú"} // Cambiar texto dinámicamente
          onSelect={toggleVisibility} // Cambiar el estado de visibilidad
        />
      </div>

      {/* Mostrar el contenido solo si isVisible es true */}
      {isVisible && (
        <ul>
          <li>
            <Link to="/user">
              <FaUser />
              {username ? ` Bienvenido, ${username}` : ' Usuario'}
            </Link>
          </li>
          <li><Link to="/reproductor"><FaHome /> Inicio</Link></li>
          <li><Link to="/explore"><FaSearch /> Explorar</Link></li>

          <h2>MI MÚSICA</h2>
          <li><Link to="/songs"><FaMusic /> Canción</Link></li>
          <li><Link to="/albumes"><FaMusic /> Álbum</Link></li>
          <li><Link to="/artist"><FaMusic /> Artista</Link></li>
          <li><Link to="/Playlist"><FaMusic /> Playlists</Link></li> 

          {userType === 'administrador' && (
            <>
              <h2>ADMINISTRACIÓN</h2>
              <li><Link to="/admin/create"><FaCog /> Crear/Editar Admin</Link></li>
              <li><Link to="/artist/create"><FaCog /> Crear/Editar Artista</Link></li>
              <li><Link to="/admin/create-user"><FaCog /> Crear/Editar Usuario</Link></li>
              <li><Link to="/admin/manage-music"><FaCog /> Editar Música</Link></li>
            </>
          )}

          {userType === 'artista' && (
            <>
              <h2>GESTIÓN DE MÚSICA</h2>
              <li><Link to="/artist/upload-album"><FaPlus /> Álbumes</Link></li>
              <li><Link to="/artist/upload-album"><FaPlus /> EPs</Link></li>
              <li><Link to="/artist/upload-song"><FaPlus /> Canciones</Link></li>
            </>
          )}

          <h2>LISTAS DE REPRODUCCIÓN</h2>
          <li><Link to="/create"><FaPlus /> Crear...</Link></li>
        </ul>
      )}

      {/* Botón de cierre de sesión */}
      {username && isVisible && (
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      )}
    </nav>
  );
}

export default Navbar;
