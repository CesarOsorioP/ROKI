import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reproductor from './Pages/Reproductor';
import Pagospage from './Pages/Pagos';
import Navbar from './Pages/Navbar';
import PlayerControl from './Pages/PlayerControl';
import UserInfo from './Components/Reproductor/UserInfo';

function App() {
  return (
    <div className='main-content'>
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reproductor" element={<Reproductor />} />
            <Route path="/pagos" element={<Pagospage />} />
            <Route path="/user" element={<UserInfo />} /> {/* Nueva ruta para la información del usuario */}
          </Routes>
        </div>
        <PlayerControl />
      </BrowserRouter>
    </div>
  );
}

export default App;
