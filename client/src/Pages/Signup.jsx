import React from 'react';
import SignupForm from '../Components/SignUp/Signup'; // Asegúrate de que la ruta sea correcta
import './CSS/signup.css'

const Signup = () => {
  return (
    <div className='signup'>
      <SignupForm />
    </div>
  );
}

export default Signup;
