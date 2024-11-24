import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Pagos/card.jsx";
import "./searcher.css";
import SearcherComponent from "./searcherinput.jsx";

const Search = () => {
  const [artists, setArtists] = useState([]); // Estado para artistas
  const [users, setUsers] = useState([]); // Estado para usuarios
  const [songs, setSongs] = useState([]); // Estado para canciones
  const [error, setError] = useState(null); // Estado para errores
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query"); // Obtén el parámetro "query" desde la URL

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        // Realizar llamadas a las APIs
        const artistsPromise = fetch(
          `http://localhost:5000/api/artists/explore?search=${query}`
        );
        const usersPromise = fetch(
          `http://localhost:5000/api/admin/explore?search=${query}`
        );
        const songPromise = fetch(
          `http://localhost:5000/api/songs/explore?search=${query}`
        );
        const albumPromise = fetch(
          `http://localhost:5000/api/albums/explore?search=${query}`
        );


        const [artistsResponse, usersResponse, songResponse, albumResponse] = await Promise.all([
          artistsPromise,
          usersPromise,
          songPromise,
          albumPromise,
        ]);

        // Verifica el estado de las respuestas y maneja los errores individualmente
        const artistsData = artistsResponse.ok ? await artistsResponse.json() : [];
        const usersData = usersResponse.ok ? await usersResponse.json() : [];
        const songsData = songResponse.ok ? await songResponse.json() : [];
        const albumsData = albumResponse.ok ? await albumResponse.json() : [];

        // Actualizar estados
        setArtists(artistsData);
        setUsers(usersData);
        setSongs(songsData);
        setAlbums(albumsData);

        // Restablecer errores si todo funciona bien
        setError(null);
      } catch (err) {
        console.error("Error al obtener los Resultados:", err);
        setError("Error al obtener los resultados. Por favor, intenta nuevamente.");
      }
    };

    if (query) fetchResultados();
  }, [query]);

  return (
    <Card>
      <div className="divprime">
        <SearcherComponent />
        <div className="title">
          <h2>Resultados que concuerden con: {query}</h2>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="grid">
          {/* Renderizar sección de resultados */}
          {artists.length > 0 && (
            <div>
              <h3>Artistas</h3>
              {artists.map((artist, index) => (
                <div key={index} className="card">
                  <p><strong>Nombre Artístico:</strong> {artist.nombre_artistico}</p>
                  <p><strong>Nombre album:</strong> {artist.nombre_album}</p>
                </div>
              ))}
            </div>
          )}

          {/* Renderizar sección de usuarios */}
          {users.length > 0 && (
            <div>
              <h3>Usuarios</h3>
              {users.map((user, index) => (
                <div key={index} className="card">
                  <p><strong>Usuario:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email || "No disponible"}</p>
                </div>
              ))}
            </div>
          )}

          {/* Renderizar sección de canciones */}
          {songs.length > 0 && (
            <div>
              <h3>Canciones</h3>
              {songs.map((song, index) => (
                <div key={index} className="card">
                  <p><strong>Nombre de Canción:</strong> {song.nombre}</p>
                  
                </div>
              ))}
            </div>
          )}
          {albums.length > 0 && (
            <div>
              <h3>Albumes</h3>
              {albums.map((album, index) => (
                <div key={index} className="card">
                  <p><strong>Nombre de Canción:</strong> {album.nombre}</p>
                  
                </div>
              ))}
            </div>
          )}

          {/* Mostrar mensaje si no hay resultados */}
          {artists.length === 0 && users.length === 0 && songs.length === 0 && !error && (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Search;
