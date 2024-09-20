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
      <form className="signup-form" onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
        <input type="text" name="username" value={username} onChange={onChange} placeholder="Nombre de usuario" />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Conéctate</a>.</p>
    </div>
  );
};

export default Signup;
