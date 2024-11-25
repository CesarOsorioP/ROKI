import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lógica del botón de regresar
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Retrocede a la página anterior si hay historial
    } else {
      navigate('/'); // Redirige a la página principal si no hay historial
    }
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Error del servidor');
    }
  };

  return (
    <div className='registro-page'>
      {/* Botón de regresar */}
      <button onClick={handleBack} className="back-button">&#8592; Regresar</button>
      
      <div className="top-bar">
        <span className="logo">R O K I</span>
        <a href="/pagos" className="roki-plus-link">Obtiene Roki plus</a>
      </div>

      <div className='registro-container'>
        <h2>Regístrate ahora en Roki!</h2>
        <p>¿Ya tienes una cuenta? <a href="/login" className="yellow-text">Conéctate</a>.</p>
        <h2>Registro</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="text-align">Nombre de usuario</h3>
          <input name="username" type="text" placeholder="Usuario" onChange={onChange} required />
          <h3 className="text-align">Email</h3>
          <input name="email" type="email" placeholder="Correo" onChange={onChange} required />
          <h3 className="text-align">Contraseña</h3>
          <input name="password" type="password" placeholder="Contraseña" onChange={onChange} required />
          <button type="submit">Registrarse</button>
        </form>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
