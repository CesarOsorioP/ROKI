import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import './Player.css'; // Asegúrate de tener un archivo CSS para estilos

const Player = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    playNextSong,
    playPrevSong,
    setIsPlaying,
    audio,
  } = useContext(PlayerContext);
  const audioRef = useRef(audio);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const updateDuration = () => {
      setDuration(audioRef.current.duration || 0);
    };

    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
      audioRef.current.addEventListener('timeupdate', updateTime);

      return () => {
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
        audioRef.current.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="player-container">
      {currentSong && (
        <>
          <div className="song-info">
            <img
              src={`http://localhost:5000/uploads/${currentSong.imagen_portada}`}
              alt={currentSong.nombre}
            />
            <div className="song-details">
              <h3>{currentSong.nombre}</h3>
              <p>{currentSong.artista_id.nombre_artistico}</p>
            </div>
          </div>
  
          <div className="controls">
            <button onClick={playPrevSong}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button onClick={handlePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button onClick={playNextSong}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
  
          <div className="time-control">
            <label>{formatTime(currentTime)}</label>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              step="0.1"
              onChange={handleTimeChange}
            />
            <label>{formatTime(duration)}</label>
          </div>
  
          <div className="volume-control">
            <label>
              <FontAwesomeIcon icon={faVolumeUp} />
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolumeChange}
            />
          </div>
        </>
      )}
    </div>
  );
}  

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Player;

