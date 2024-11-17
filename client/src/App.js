import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reproductor from './Pages/Reproductor';
import Pagospage from './Pages/Pagos';
import ArtistInfo from './Components/Reproductor/ArtistInfo';
import ResultsArtistsPage from './Pages/searcherArtist';
import UserInfo from './Components/Reproductor/UserInfo';
import RecuperatePage from './Pages/recuperarContrase;a';
import RecuperatePage2 from './Pages/recuperateC';
import CreateAdmin from './Pages/CreateAdmin'; // Página para crear administradores
import CreateArtist from './Pages/CreateArtist'; // Página para crear artistas
import CreateUser from './Pages/CreateUser'; // Página para crear usuarios
import UploadAlbum from './Pages/UploadAlbum';
import UploadSong from './Pages/UploadSong';
import AlbumGrid from './Components/Reproductor/AlbumGrid';
import Album from './Pages/Album';
import PlayList from './Pages/Playlist';


function App() {
  return (
    <div className='main-content'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reproductor" element={<Reproductor />} />
          <Route path="/pagos" element={<Pagospage />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/forgot-password" element={<RecuperatePage />} />
          <Route path="/recuperar" element={<RecuperatePage2 />} />
          <Route path="/albumes" element={<AlbumGrid />} /> {/* Muestra el grid de álbumes */}
          <Route path="/albumes/:albumName" element={<Album />} /> {/* Detalle de cada álbum */}
          <Route path="/artist-results" element ={<ResultsArtistsPage/>}/>
          {/* Rutas de administración */}
          <Route path="/admin/create" element={<CreateAdmin />} />
          {/* Rutas de gestión de artistas */}
          <Route path="/artist" element= {<ArtistInfo />} />
          <Route path="/artist/create" element={<CreateArtist />} />
          <Route path="/artist/upload-album" element={<UploadAlbum />} />
          <Route path="/artist/upload-song" element={<UploadSong />} />
          {/* Rutas de gestión de usuarios */}
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/Playlist" element={<PlayList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
