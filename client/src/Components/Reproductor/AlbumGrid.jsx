import React from 'react';
import './AlbumGrid.css';

function AlbumGrid() {
  const albums = new Array(5).fill('Álbum');

  return (
    <div className="album-grid">
      <h2>Reproducido recientemente</h2>
      <div className="album-grid-container">
        {albums.map((album, index) => (
          <div className="album-item" key={index}>
            <div className="album-placeholder"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;
