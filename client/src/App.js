import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reproductor from './Pages/Reproductor';
import Pagospage from './Pages/Pagos';
import UserInfo from './Components/Reproductor/UserInfo';
import RecuperatePage from './Pages/recuperarContrase;a';
import RecuperatePage2 from './Pages/recuperateC';
import ResultsArtistsPage from './Pages/searcherArtist';


function App() {
  return (
    <div className='main-content'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reproductor" element={<Reproductor/>}/>
          <Route path="/pagos" element={<Pagospage/>}/>
          <Route path="/user" element={<UserInfo />} /> {/* Nueva ruta para la información del usuario */}
          <Route path="/recuperarCont" element={<RecuperatePage/>} />
          <Route path="/recuperar" element={<RecuperatePage2/>} />
          <Route path="/artist-results" element ={<ResultsArtistsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
