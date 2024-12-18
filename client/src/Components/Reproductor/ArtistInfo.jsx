import React, { useState, useEffect } from 'react';

function ArtistInfo({ artistId }) {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los álbumes del artista
    fetch(`/api/artists/${artistId}/albums`)
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Error:', error));

    // Llamada a la API para obtener las canciones del artista
    fetch(`/api/artists/${artistId}/songs`)
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error('Error:', error));
  }, [artistId]);

  return (
    <div>
      <h2>Álbumes del Artista</h2>
      <ul>
        {albums.map(album => (
          <li key={album._id}>{album.nombre}</li>
        ))}
      </ul>
      <h2>Canciones del Artista</h2>
      <ul>
        {songs.map(song => (
          <li key={song._id}>{song.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistInfo;
