// src/Components/Reproductor/Albumes.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import albumData from './albumData';
import PlayerControl from './PlayerControl';
import Navbar from './Navbar'; 
import './Albumes.css';

function Albumes() {
    const { albumName } = useParams();
    const [currentSong, setCurrentSong] = useState(null);

    const album = albumData.find((a) => a.name === albumName);

    if (!album) {
        return <p>Álbum no encontrado</p>;
    }

    return (
        <div className="album-page">
            <Navbar />
            <div className="album-content">
                <div className="album-header">
                    <img src={album.image} alt={album.name} className="album-image" />
                    <div className="album-info">
                        <h2>{album.name.replace(/-/g, ' ')}</h2>
                        <p className="artist-name">{album.artist_name}</p>
                        <p className="album-description">{album.description}</p>
                    </div>
                </div>

                <div className="song-list">
                    <h3>Canciones</h3>
                    <ul>
                        {album.songs.map((song, index) => (
                            <li
                                key={index}
                                className="song-item"
                                onClick={() => setCurrentSong(song)}
                            >
                                <span className="song-number">{index + 1}</span> {/* Numeración de canciones */}
                                <p>{song.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {currentSong && (
                <div className="player-container">
                    <PlayerControl
                        audioSrc={currentSong.file}
                        title={currentSong.name}
                        artist={album.artist_name}
                    />
                </div>
            )}
        </div>
    );
}

export default Albumes;
