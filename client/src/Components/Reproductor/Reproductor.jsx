import React from 'react';
import Navbar from './Navbar';
import Albumes from './Albumes';
import Canciones from './Canciones';


import './Reproductor.css';

function Reproductor() {
  return (
    <div className="reproductor">
      <Navbar />
      <Albumes /> 



      <div className="content">
        
      </div>
    
    </div>
  );
}

export default Reproductor;
