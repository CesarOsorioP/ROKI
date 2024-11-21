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
        // Reemplaza con el endpoint de tu backend que acepte el término de búsqueda
        const response = await fetch(`/explore?search=${query}`);
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
        <SearcherComponent></SearcherComponent>
        <div className="title">
          <h2>Resultados que concuerden con: {query}</h2>
        </div>
        <div className="grid">
          {Resultados.length > 0 ? (
            Resultados.map((resultado, index) => (
              <div key={index} className="card">
                <p>{resultado.nombre}</p>
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
