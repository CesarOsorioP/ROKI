import React from 'react';
import './Signup.css';
import Card from '../Pagos/card'

const Signup = () => {
    return (
        <Card>
        <div className="signup-container">
        <h2 >Regístrate ahora en Roki!</h2>
        <form className="signup-form">
        <p class = "bolded">¿Ya tienes una cuenta? <a href="/login">Conéctate</a>.</p>
        <h3 class = "text-align">Email</h3>
        <input type="email" placeholder="ROKI@gmail.com" />
        <h3 class = "text-align">Contraseña</h3>
        <input type="password" placeholder="################" />
        <h3 class = "text-align">Nombre de usuario</h3>
        <input type="text" placeholder="Gogo Manotas" />
        <h3 class = "text-align">Edad</h3>
        <input type="text" placeholder="0" />
        <button type="submit">Registrarse</button>
        </form>
        </div>
        </Card>
    );
};

export default Signup;
