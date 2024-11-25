import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Pagos/card.jsx";
import "./searcher.css";
import SearcherComponent from "./searcherinput.jsx";

// Componente para renderizar secciones de resultados
const ResultSection = ({ title, data, label, field }) => {
  return data.length > 0 ? (
    <div className="minidiv">
      <h3>{title}</h3>
      {data.map((item) => (
        <div key={item[field]} className="minidiv">
          <p><strong>{label}:</strong> {item[field]}</p>
        </div>
      ))}
    </div>
  ) : null;
};

const Search = () => {
  const [artists, setArtists] = useState([]); // Estado para artistas
  const [users, setUsers] = useState([]); // Estado para usuarios
  const [songs, setSongs] = useState([]); // Estado para canciones
  const [albums, setAlbums] = useState([]); // Estado para álbumes
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
<<<<<<< HEAD
        <div className="splitsearcher">
          <div className="grid">
            <ResultSection title="Artistas" data={artists} label="Nombre Artístico" field="nombre_artistico" />
            <ResultSection title="Usuarios" data={users} label="Usuario" field="username" />
            <ResultSection title="Canciones" data={songs} label="Nombre de Canción" field="nombre" />
            <ResultSection title="Álbumes" data={albums} label="Nombre del Álbum" field="nombre" />
            {/* Mostrar mensaje si no hay resultados */}
            {artists.length === 0 && users.length === 0 && songs.length === 0 && albums.length === 0 && !error && (
              <p>No se encontraron resultados.</p>
            )}
          </div>
=======
        <div className="grid">
          {/* Renderizar sección de resultados */}
          {artists.length > 0 && (
            <div className="minidiv">
              <h3>Artistas</h3>
              {artists.map((artist, index) => (
                <div key={index} className="minidiv">
                  <p><strong>Nombre Artístico:</strong> {artist.nombre_artistico}</p>
                </div>
              ))}
            </div>
          )}

          {/* Renderizar sección de usuarios */}
          {users.length > 0 && (
            <div className="minidiv">
              <h3>Usuarios</h3>
              {users.map((user, index) => (
                <div key={index} className="minidiv">
                  <p><strong>Usuario:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email || "No disponible"}</p>
                </div>
              ))}
            </div>
          )}

          {/* Renderizar sección de canciones */}
          {songs.length > 0 && (
            <div className="minidiv">
              <h3>Canciones</h3>
              {songs.map((song, index) => (
                <div key={index} className="minidiv">
                  <p><strong>Nombre de Canción:</strong> {song.nombre}</p>
                  
                </div>
              ))}
            </div>
          )}

          {/* Renderizar sección de álbumes */}
          {albums.length > 0 && (
            <div className="minidiv">
              <h3>Álbumes</h3>
              {albums.map((album, index) => (
                <div key={index} className="minidiv">
                  <p><strong>Nombre del Álbum:</strong> {album.nombre}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mostrar mensaje si no hay resultados */}
          {artists.length === 0 && users.length === 0 && songs.length === 0 && albums.length === 0 && !error && (
            <p>No se encontraron resultados.</p>
          )}
>>>>>>> 60549a14461f5132207fd5085d7ef1a410c2b58f
        </div>
      </div>
    </Card>
  );
};

export default Search;
