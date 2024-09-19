import React from 'react';
import './MixGrid.css';

function MixGrid() {
    const mixes = new Array(5).fill('Mix');

  return (
    <div className="mix-grid">
      <h2>Mixes personalizados</h2>
      <div className="mix-grid-container">
        {mixes.map((mix, index) => (
          <div className="mix-item" key={index}>
            <div className="mix-placeholder"></div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default MixGrid;
