import React from "react";
import Card from "../Pagos/card.jsx";
import "./recuperarContraseñacss.css";

const RecuperarContraseña = () => {
  const handleForgotPassword = async () => {
    const email = document.querySelector('input[name="email"]').value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', { // Asegúrate de que esta URL es correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.msg);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Error al enviar el correo de recuperación.');
    }
  };

  return (
    <Card>
      <div className="divprime">
        <div className="split1">
          <div className="tittle">
            <h2 className="onlytittle">¿Olvidaste tu contraseña?</h2>
          </div>
          <div>
            <p>
              Ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña.
            </p>
          </div>
          <div className="minidiv">
            <label>Correo electrónico:</label>
            <input
              name="email"
              placeholder="Correo"
              type="text"
              className="input_field"
            />
            <button className="button" onClick={handleForgotPassword}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecuperarContraseña;
