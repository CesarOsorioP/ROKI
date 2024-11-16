import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Contenedor de navegación */}
      <nav className="landing-nav">
        <div className="nav-buttons">
          <Link to="/login" className="btn nav-btn">Iniciar Sesión</Link>
          <Link to="/signup" className="btn nav-btn">Regístrate</Link>
          <Link to="/reproductor" className="btn nav-btn">Ir a reproductor web</Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <header className="landing-header">
        <h1>Bienvenido a ROKI</h1>
        <p>Tu plataforma de streaming de música favorita</p>
      </header>
      
      <section className="features">
        <h2>Características Destacadas</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Escucha Sin Límites</h3>
            <p>Accede a millones de canciones sin interrupciones.</p>
          </div>
          <div className="feature-card">
            <h3>Calidad de Sonido Premium</h3>
            <p>Disfruta de la mejor calidad de sonido disponible.</p>
          </div>
          <div className="feature-card">
            <h3>Playlist Personalizadas</h3>
            <p>Crea y comparte tus propias playlists con tus amigos.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        
      </footer>
    </div>
  );
};

export default LandingPage;
