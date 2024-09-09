import React from 'react';
import { FaPlay, FaStepForward, FaStepBackward, FaHeart, FaRandom } from 'react-icons/fa';
import './PlayerControl.css';

function PlayerControl() {
  return (
    <div className="player-control">
      <div className="player-info">
        <span>Nombre canción</span>
        <span>Artista</span>
      </div>
      <div className="player-buttons">
        <FaStepBackward />
        <FaPlay />
        <FaStepForward />
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
