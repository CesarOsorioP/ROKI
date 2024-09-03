import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Bienvenido a Roki</h1>
        <p>Tu plataforma de streaming de música favorita</p>
      </header>
      <div className="landing-buttons">
        <Link to="/signup" className="btn">Regístrate</Link>
        <Link to="/login" className="btn">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default LandingPage;
