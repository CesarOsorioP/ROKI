import React from 'react';
import './UserInfo.css';

function UserInfo({ userName, gradientColor }) {
  return (
    <div className="user-info">
      <div className="banner" style={{ background: `linear-gradient(${gradientColor})` }}>
        <div className="banner-overlay"></div> {/* Capa de estilo extra para elegancia */}
      </div>
      <div className="user-details">
        <hr />
        <div className="user-name">
          <h3>Usuario</h3>
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
  );
}

export default UserInfo;
