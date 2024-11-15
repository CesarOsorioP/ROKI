import React, { useState, useEffect } from "react";
import Card from "../Pagos/card.jsx";
import "./artistsearcher.css" // Asegúrate de que la ruta sea correcta

const SearchArtist = () => {
  const [artistas, setArtistas] = useState([]);

  // Simula obtener datos del backend al montar el componente
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        // Cambia esta URL por el endpoint real de tu backend
        const response = await fetch("https://tu-backend-api.com/artistas");
        const data = await response.json(); // Asume que el backend responde con JSON
        setArtistas(data); // Guarda los artistas en el estado
      } catch (error) {
        console.error("Error al obtener los artistas:", error);
      }
    };

    fetchArtistas();
  }, []);

  return (
    <Card>
      <div className="divprime">
        <div className="title">
          <h2>Resultados de artistas que concuerden con: @artistaletocaalosdelback,creo</h2>
        </div>
        <div className="grid">
          {artistas.length > 0 ? (
            artistas.map((artista, index) => (
              <div key={index} className="card">
                <p>{artista.nombre}</p> {/* Muestra el nombre del artista */}
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
