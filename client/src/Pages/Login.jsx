import React from 'react';
import LoginForm from '../Components/Login/Login'; // Asegúrate de que la ruta sea correcta
import './CSS/login.css'

const Login = () => {
  return (
    <div className='login'>
      <LoginForm />
    </div>
  );
}

export default Login;
