import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Iniciar sesión en Roki</h2>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className="forgot-password">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="create-account">
        <a href="/signup">¿Sin cuenta? Crea una ahora.</a>
      </div>
    </div>
  );
};

export default Login;
