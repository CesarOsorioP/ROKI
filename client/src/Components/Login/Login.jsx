import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que el CSS esté en un archivo llamado Login.css

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Manejar el éxito del inicio de sesión
        console.log('Inicio de sesión exitoso:', data);
      } else {
        // Manejar errores
        setError(data.msg);
      }
    } catch (err) {
      console.error('Error del servidor:', err);
      setError('Error del servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="forgot-password">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="create-account">
        <a href="/signup">¿No tienes una cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default Login;
