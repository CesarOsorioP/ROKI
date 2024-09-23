import React from 'react';
import './UserInfo.css';

function UserInfo({ userName, gradientColor }) {
  return (
    <div className="user-info">
      <div className="banner" style={{ background: `linear-gradient(${gradientColor})` }}></div>
      <div className="user-details">
        <h2>Información del Usuario</h2>
        <h3>{userName}</h3>
      </div>
      <div className="navigation">
        <button>Canciones</button>
        <button>Álbumes</button>
        <button>Artistas</button>
        <button>Seguidores</button>
        <button>Siguiendo</button>
      </div>
    </div>
  );
}

export default UserInfo;
