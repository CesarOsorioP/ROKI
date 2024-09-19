import React from 'react';
import Navbar from './Navbar';
import AlbumGrid from './AlbumGrid';
import MixGrid from './MixGrid';
import PlayerControl from './PlayerControl';
import './Reproductor.css';

function Reproductor() {
  return (
    <div className="reproductor">
      <Navbar />
      <div className="content">
        <AlbumGrid />
        <MixGrid />
      </div>
      <PlayerControl />
    </div>
  );
}

export default Reproductor;
