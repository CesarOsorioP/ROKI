import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Pagos/card.jsx";
import "./searcher.css";
import SearcherComponent from "./searcherinput.jsx";

const Search = () => {
  const [artists, setArtists] = useState([]); // Estado para artistas
  const [users, setUsers] = useState([]); // Estado para usuarios
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

        const [artistsResponse, usersResponse] = await Promise.all([
          artistsPromise,
          usersPromise,
        ]);

        // Verifica el estado de las respuestas y maneja los errores individualmente
        const artistsData =
          artistsResponse.ok ? await artistsResponse.json() : [];
        const usersData = usersResponse.ok ? await usersResponse.json() : [];

        // Actualizar estados
        setArtists(artistsData);
        setUsers(usersData);

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
          {/* Renderizar sección de artistas */}
          {artists.length > 0 && (
            <div>
              <h3>Artistas</h3>
              {artists.map((artist, index) => (
                <div key={index} className="card">
                  <p><strong>Nombre Artístico:</strong> {artist.nombre_artistico}</p>
                  <p><strong>Nombre Real:</strong> {artist.nombre_real || "No disponible"}</p>
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

          {/* Mostrar mensaje si no hay resultados */}
          {artists.length === 0 && users.length === 0 && !error && (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Search;
