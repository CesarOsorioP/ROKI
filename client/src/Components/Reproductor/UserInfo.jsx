import React from 'react';
import './UserInfo.css';
import Navbar from './Navbar'; // Asegúrate de tener un componente Navbar

function UserInfo({ userName, gradientColor }) {
  return (
    <>
      <Navbar />
      <div className="user-info">
        <div className="banner" style={{ background: `linear-gradient(${gradientColor})` }}>
          <div className="banner-overlay"></div> {/* Capa de estilo extra para elegancia */}
        </div>
        <div className="user-details">
          <h3>{userName ? ` Bienvenido, ${userName}` : ' Usuario'}</h3> {/* Muestra el nombre del usuario */}
          <hr />
          <div className="user-name">
            <h3>{userName}</h3>
          </div>
        </div>
        <div className="navigation">
          <a href="/songs"><button>Canciones</button></a>
          <a href="/albumes"><button>Álbumes</button></a>
          <a href="/Playlist"><button>Listas de Reproducción</button></a>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
