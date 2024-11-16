import React from 'react';
import PlayerControl from '../Reproductor/PlayerControl';
import "./Playlist.css"
import "../Reproductor/Reproductor.css"


function Playlist() {
  return (
    <div className='reproductor'>
      <PlayerControl />
    </div>

  );
}

export default Playlist;