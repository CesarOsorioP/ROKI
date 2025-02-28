import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // ir a la landing page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, username, userType, userId, artistId } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('userType', userType);
                localStorage.setItem('userId', userId); // Almacenar el userId en el local storage

                if (userType === 'artista') {
                    localStorage.setItem('artistId', artistId);
                }

                navigate(userType === 'administrador' ? '/reproductor' : '/reproductor');
            } else {
                setError(data.msg || 'Error desconocido en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error del servidor:', error);
            setError('Error del servidor. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="login-container">
            <button onClick={handleBack} className="back-button">
                &#8592; Regresar
            </button>
            <h2>INICIAR SESIÓN</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">Iniciar Sesión</button>
            </form>
            <div className="forgot-password">
                <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="create-account">
                <a href="/signup">¿No tienes una cuenta? Regístrate</a>
            </div>
        </div>
    );
}

export default Login;
