import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para obtener parámetros de la URL
import Card from "../Pagos/card.jsx";
import "./searcher.css";
import SearcherComponent from "./searcherinput.jsx";

const Search = () => {
  const [Resultados, setResultados] = useState([]); // Estado para almacenar los Resultados
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query"); // Obtén el parámetro "query" desde la URL

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        // Endpoint ajustado para el controlador del backend
        const response = await fetch(`http://localhost:5000/api/artists/explore?search=${query}`);

        if (!response.ok) {
          throw new Error("Error al obtener los resultados");
        }
        const data = await response.json();
        setResultados(data);
      } catch (error) {
        console.error("Error al obtener los Resultados:", error);
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
        <div className="grid">
          {Resultados.length > 0 ? (
            Resultados.map((resultado, index) => (
              <div key={index} className="card">
                {/* Ajusta los campos según los datos del backend */}
                <p><strong>Artista:</strong> {resultado.nombre_artistico}</p>
                <p><strong>Nacionalidad:</strong> {resultado.nacionalidad}</p>
                <p><strong>Email:</strong> {resultado.email}</p>
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

export default Search;
