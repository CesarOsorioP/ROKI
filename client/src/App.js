import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './Context/PlayerContext';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reproductor from './Pages/Reproductor';
import Pagospage from './Pages/Pagos';
import ResultsPage from './Pages/searcher';
import UserInfo from './Components/Reproductor/UserInfo';
import RecuperatePage from './Pages/recuperarContrase;a'; // Error de tipeo
import RecuperatePage2 from './Pages/recuperateC';
import CreateAdmin from './Pages/CreateAdmin';
import CreateArtist from './Pages/CreateArtist';
import CreateUser from './Pages/CreateUser';
import UploadAlbum from './Pages/UploadAlbum';
import UploadSong from './Pages/UploadSong';
import Album from './Pages/Album';
import AlbumDetail from './Pages/AlbumDetail';
import PlayList from './Pages/Playlist';
import Canciones from './Pages/Canciones';
import Player from './Components/Reproductor/Player';
import CreatePlaylistPage from './Pages/CreatePlaylistPage';
import SongsPage from './Pages/SongsPage';
import ActualizarContraseña from './Pages/ActualizarContraseñaa';
import ArtistDetail from './Pages/ArtistDetail';
import ArtistInfo from './Pages/Artist';

function App() {
  return (
    <PlayerProvider>
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
            <Route path="/canciones" element={<Canciones />} />
            <Route path="/explore" element={<ResultsPage />} />
            <Route path="/admin/create" element={<CreateAdmin />} />
            
            {/* Rutas de artistas */}
            <Route path="/artist" element={<ArtistInfo />} />
            <Route path="/artists" element={<ArtistInfo />} /> {/* Eliminé route en minúsculas */}
            <Route path="/artist/create" element={<CreateArtist />} />
            <Route path="/artist/upload-album" element={<UploadAlbum />} />
            <Route path="/artist/upload-song" element={<UploadSong />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />

            {/* Rutas de usuarios */}
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/playlist" element={<PlayList />} />
            <Route path="/albumes" element={<Album />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/create-playlist" element={<CreatePlaylistPage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/actualizar-contraseña" element={<ActualizarContraseña />} />
          </Routes>
          <Player />
        </BrowserRouter>
      </div>
    </PlayerProvider>
  );
}

export default App;