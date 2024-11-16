import React, { useState } from 'react';
import './CreateAdmin.css';

function CreateAdmin() {
  const [newAdminData, setNewAdminData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData({ ...newAdminData, [name]: value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Verifica si el token existe antes de proceder
    if (!token) {
      setError('No tienes autorización para realizar esta acción.');
      return;
    }

    console.log('Token:', token); // Depuración: verificar que el token se obtiene correctamente

    try {
      const response = await fetch('http://localhost:5000/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agregar el token en las cabeceras
        },
        body: JSON.stringify(newAdminData),
      });

      if (response.ok) {
        setSuccess('Administrador creado exitosamente');
        setNewAdminData({ username: '', email: '', password: '' });
        setError(null);
      } else {
        const data = await response.json();
        setError(data.msg || 'Error al crear el administrador');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error del servidor:', error);
      setError('Error del servidor. Inténtalo de nuevo más tarde.');
      setSuccess(null);
    }
  };

  return (
    <div className="create-admin-container">
      <h2>Crear Nuevo Administrador</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form className="create-admin-form" onSubmit={handleCreateAdmin}>
        <input
          type="text"
          name="username"
          value={newAdminData.username}
          onChange={handleInputChange}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="email"
          name="email"
          value={newAdminData.email}
          onChange={handleInputChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={newAdminData.password}
          onChange={handleInputChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Crear Administrador</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
