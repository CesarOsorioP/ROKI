import React from 'react';
import { FaPlay, FaStepForward, FaStepBackward, FaHeart, FaRandom } from 'react-icons/fa';

import { MdRepeat } from 'react-icons/md';  // Icono de repetir
import './PlayerControl.css';

function PlayerControl() {
  return (
    <div className="player-control">
      <div className="player-info">
        <div className="album-cover"></div> {/* Imagen del álbum */}
        <div className="song-info">
          <span>Nombre canción</span>
          <span>Artista</span>
        </div>
      </div>
      <div className="player-center">
        <div className="player-buttons">
          <FaRandom className="icon" />
          <FaStepBackward className="icon" />
          <FaPlay className="icon play-button" />
          <FaStepForward className="icon" />
          <MdRepeat className="icon" />
        </div>
        <div className="player-progress">
          <span>3:47</span>
          <input type="range" min="0" max="100" value="50" className="progress-bar" />
          <span>5:32</span>
        </div>
      </div>
    
  
      <div className="player-volume">
        <FaHeart />
        <FaRandom />
        <input type="range" min="0" max="100" />

      </div>
    </div>
  );
}

export default PlayerControl;
