import React, { createContext, useState, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [songQueue, setSongQueue] = useState([]); // Cola de canciones
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Índice de la canción actual

  useEffect(() => {
    if (currentSong) {
      audio.src = `http://localhost:5000/uploads/${currentSong.enlace_cancion}`;
      audio.play();
      setIsPlaying(true);
      audio.addEventListener('ended', playNextSong); // Escuchar cuando la canción termina
    }
  }, [currentSong]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const playNextSong = () => {
    if (songQueue.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songQueue.length;
      setCurrentSongIndex(nextIndex);
      setCurrentSong(songQueue[nextIndex]);
    }
  };

  const playPrevSong = () => {
    if (songQueue.length > 0) {
      const prevIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
      setCurrentSongIndex(prevIndex);
      setCurrentSong(songQueue[prevIndex]);
    }
  };

  const setQueue = (queue, index) => {
    setSongQueue(queue);
    setCurrentSongIndex(index);
    setCurrentSong(queue[index]);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong, playNextSong, playPrevSong, setQueue, setIsPlaying, audio }}>
      {children}
    </PlayerContext.Provider>
  );
};
