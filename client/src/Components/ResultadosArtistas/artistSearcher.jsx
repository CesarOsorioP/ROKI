import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para obtener parámetros de la URL
import Card from "../Pagos/card.jsx";
import "./artistsearcher.css";
import ArtistSearcher from "./searcherinput.jsx"; 

const SearchArtist = () => {
  const [artistas, setArtistas] = useState([]); // Estado para almacenar los artistas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query"); // Obtén el parámetro "query" desde la URL

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        // Reemplaza con el endpoint de tu backend que acepte el término de búsqueda
        const response = await fetch(`https://tu-backend-api.com/artistas?search=${query}`);
        const data = await response.json();
        setArtistas(data);
      } catch (error) {
        console.error("Error al obtener los artistas:", error);
      }
    };

    if (query) fetchArtistas();
  }, [query]);

  return (
    <Card>
      <div className="divprime">
        <ArtistSearcher></ArtistSearcher>
        <div className="title">
          <h2>Resultados de artistas que concuerden con: {query}</h2>
        </div>
        <div className="grid">
          {artistas.length > 0 ? (
            artistas.map((artista, index) => (
              <div key={index} className="card">
                <p>{artista.nombre}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SearchArtist;
