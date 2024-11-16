import React, { useState, useRef } from 'react';
import './PlayerControl.css';

const PlayerControl = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const songs = []; // Aquí deberías agregar las canciones

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Volver al inicio si es la última canción
    }
  };

  const playPreviousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(songs.length - 1); // Volver a la última canción
    }
  };

  return (
    <div className="player-control">
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      <div className="controls">
        <button className="control-btn" onClick={playPreviousSong}>
          <i className="fas fa-step-backward"></i>
        </button>
        <button className="control-btn play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <button className="control-btn" onClick={playNextSong}>
          <i className="fas fa-step-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default PlayerControl;
