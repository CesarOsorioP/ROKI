import React from "react";
import "./MainContent.css";

function MainContent() {
  return (
    <div className="principal-content">
      <div className="playlist-info">
        <div className="playlist-cover"></div>
        <div className="playlist-details">
          <h2>Nombre Playlist</h2>
          <p>User</p>
        </div>
        <button className="play-button">▶</button>
      </div>
      <table className="song-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Álbum</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ABEL</td>
            <td>BROWN BOY</td>
            <td>2:40</td>
          </tr>
          <tr>
            <td>2</td>
            <td>MOJABI GHOST</td>
            <td>DATA</td>
            <td>3:44</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Vida de Rock</td>
            <td>Ameri</td>
            <td>3:22</td>
          </tr>
          {/* Añade más filas aquí si lo necesitas */}
        </tbody>
      </table>
    </div>
  );
}

export default MainContent;