import React from 'react';
import Navbar from './Navbar';

import PlayerControl from './PlayerControl';
import './Reproductor.css';

function Reproductor() {
  return (
    <div className="reproductor">
      <Navbar />
      <div className="content">
        
      </div>
      <PlayerControl />
    </div>
  );
}

export default Reproductor;
