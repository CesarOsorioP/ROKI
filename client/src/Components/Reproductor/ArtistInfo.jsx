import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ArtistInfo = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artists/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="artist-info-container">
      <h1>Artistas</h1>
      <div className="artist-list">
        {artists.map(artist => (
          <div key={artist._id} className="artist-item">
            <Link to={`/artist/${artist._id}`}>
              <img 
                src={`http://localhost:5000/uploads/${artist.imagen}`} 
                alt={artist.nombre_artistico} 
                className="artist-image" 
              />
              <h3>{artist.nombre_artistico}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistInfo;
