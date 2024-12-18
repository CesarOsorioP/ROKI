// src/Components/RecuperarCont/ActualizarContraseña.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './ActualizarContraseña.css'


const ActualizarContraseña = () => {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleResetPassword = async () => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      setMessage(data.msg);
    } catch (error) {
      console.error(error);
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="update-password-form">
      <h2>Actualizar Contraseña</h2>
      <p>Digita tu nueva contraseña.</p>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Actualizar</button>
      <p>{message}</p>
      <p>Puedes cerrar esta ventana.</p>
    </div>
  );
};

export default ActualizarContraseña;