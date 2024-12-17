import React from "react";
import Card from "../Pagos/card.jsx";
import "./recuperarContraseñacss.css";

const RecuperateC = () => {
  const handleChangePassword = async () => {
    const email = document.querySelector('input[name="email"]').value;
    const currentPassword = document.querySelector('input[name="currentPassword"]').value;
    const newPassword = document.querySelector('input[name="newPassword"]').value;

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await response.json();
      alert(data.msg);
    } catch (error) {
      console.error(error);
      alert('Error al cambiar la contraseña.');
    }
  };

  return (
    <Card>
      <div className="divprime">
        <div className="split1">
          <div className="tittle">
            <h1>Cambiar Contraseña</h1>
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input name="email" placeholder="Correo" type="text" className="input_field" />
            <label>Contraseña actual:</label>
            <input
              name="currentPassword"
              placeholder="Contraseña actual"
              type="text"
              className="input_field"
            />
            <label>Nueva contraseña:</label>
            <input
              name="newPassword"
              placeholder="Contraseña nueva"
              type="text"
              className="input_field"
            />
            <button className="button" onClick={handleChangePassword}>
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecuperateC;
