import React, { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import axios from 'axios';
import './Player.css'; // Asegúrate de tener un archivo CSS para estilos

const Player = () => {
  const { currentSong, isPlaying, playSong, pauseSong, playNextSong, playPrevSong, setIsPlaying, audio } = useContext(PlayerContext);
  const audioRef = useRef(audio);

  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/player/current');
        playSong(response.data);
      } catch (error) {
        console.error('Error fetching current song:', error);
      }
    };

    fetchCurrentSong();
  }, [playSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    playNextSong();
  };

  const handlePreviousSong = () => {
    playPrevSong();
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  const handleTimeUpdate = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <div className="player-container">
      {currentSong && (
        <>
          <div className="song-info">
            <img src={`http://localhost:5000/uploads/${currentSong.imagen_portada}`} alt={currentSong.nombre} />
            <div className="song-details">
              <h3>{currentSong.nombre}</h3>
              <p>{currentSong.artista_id.nombre_artistico}</p>
            </div>
          </div>
          <div className="controls">
            <button onClick={handlePreviousSong}>Prev</button>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={handleNextSong}>Next</button>
          </div>
          <div className="volume-control">
            <label>Volume</label>
            <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
          </div>
          <div className="time-control">
            <label>Time</label>
            <input type="range" min="0" max={audio.duration || 0} step="1" onChange={handleTimeUpdate} />
          </div>
        </>
      )}
    </div>
  );
}

export default Player;
