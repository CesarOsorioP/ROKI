import React from 'react';
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">
        <h2>Regístrate ahora en Roki!</h2>
        <form className="signup-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <input type="text" placeholder="Nombre de usuario" />
        <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <a href="/login">Conéctate</a>.</p>
        </div>
    );
};

export default Signup;
