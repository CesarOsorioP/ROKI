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
        <h3>Usuario</h3>
          <hr />
          <div className="user-name">
            <h3>{userName}</h3>
          </div>
        </div>
        <div className="navigation">
          <button>Canciones</button>
          <button>Álbumes</button>
          <button>Artistas</button>
          <button>Seguidores</button>
          <button>Siguiendo</button>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
