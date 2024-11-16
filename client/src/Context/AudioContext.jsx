import React, { createContext, useContext, useState, useRef } from 'react';

// Crear el contexto de audio
const AudioContext = createContext();

// Proveedor del contexto de audio
export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); // Canción actual
  const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducción
  const audioRef = useRef(null); // Referencia al elemento de audio

  const play = (song) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pausar la canción actual
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause(); // Pausar la canción actual
    }
  };

  const next = () => {
    // Lógica para ir a la siguiente canción
  };

  const prev = () => {
    // Lógica para ir a la canción anterior
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        play,
        pause,
        next,
        prev,
        audioRef,
      }}
    >
      <audio ref={audioRef} src={currentSong ? currentSong.file : ''} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
};

// Hook para usar el contexto de audio
export const useAudio = () => {
  return useContext(AudioContext);
};
