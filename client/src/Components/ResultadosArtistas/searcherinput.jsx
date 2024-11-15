import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al componente de resultados
import "./artistcss.jsx";

const ArtistSearcher = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el input
  const navigate = useNavigate(); // Hook para redirigir

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/searchartist?query=${encodeURIComponent(searchTerm)}`); // Redirige a la página con el término de búsqueda
    }
  };

  return (
    <div className="artist-searcher">
      <input
        type="text"
        placeholder="Buscar artista..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del input
        className="input-search"
      />
      <button onClick={handleSearch} className="btn-search">
        Buscar
      </button>
    </div>
  );
};

export default ArtistSearcher;
