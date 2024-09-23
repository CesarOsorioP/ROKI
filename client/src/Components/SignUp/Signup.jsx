import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const { email, password, username } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Regístrate ahora en Roki!</h2>
      <p>¿Ya tienes una cuenta? <a href="/login">Conéctate</a>.</p>
      <form className="signup-form" onSubmit={onSubmit}>
      <h3 class = "text-align">Email</h3>
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
        <h3 class = "text-align">Contraseña</h3>
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
        <h3 class = "text-align">Nombre de usuario</h3>
        <input type="text" name="username" value={username} onChange={onChange} placeholder="Nombre de usuario" />
        <h3 class = "text-align">Edad</h3>
        <input type="number" placeholder="Edad" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;
