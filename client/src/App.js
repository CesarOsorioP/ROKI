import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './Context/PlayerContext'; // Importa el contexto del reproductor
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reproductor from './Pages/Reproductor';
import Pagospage from './Pages/Pagos';
import ArtistInfo from './Components/Reproductor/ArtistInfo';
import ResultsPage from './Pages/searcher';
import UserInfo from './Components/Reproductor/UserInfo';
import RecuperatePage from './Pages/recuperarContrase;a';
import RecuperatePage2 from './Pages/recuperateC';
import CreateAdmin from './Pages/CreateAdmin'; // Página para crear administradores
import CreateArtist from './Pages/CreateArtist'; // Página para crear artistas
import CreateUser from './Pages/CreateUser'; // Página para crear usuarios
import UploadAlbum from './Pages/UploadAlbum';
import UploadSong from './Pages/UploadSong';
import Album from './Pages/Album'; // Importa la página Album
import AlbumDetail from './Pages/AlbumDetail'; // Importa el componente AlbumDetail
import PlayList from './Pages/Playlist';
import Canciones from './Pages/Canciones'; // Importación correcta de Canciones
import Player from './Components/Reproductor/Player'; // Importa el componente Player
import CreatePlaylistPage from './Pages/CreatePlaylistPage'; // Importa la nueva página de CreatePlaylist
import SongsPage from './Pages/SongsPage'; // Importa la página de Songs
import ActualizarContraseña from './Pages/ActualizarContraseñaa'; // Importa la página ActualizarContraseña

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
            <Route path="/canciones" element={<Canciones />} /> {/* Muestra la lista de canciones */}
            <Route path="/explore" element={<ResultsPage />} />
            {/* Rutas de administración */}
            <Route path="/admin/create" element={<CreateAdmin />} />
            {/* Rutas de gestión de artistas */}
            <Route path="/artist" element={<ArtistInfo />} />
            <Route path="/artist/create" element={<CreateArtist />} />
            <Route path="/artist/upload-album" element={<UploadAlbum />} />
            <Route path="/artist/upload-song" element={<UploadSong />} />
            {/* Rutas de gestión de usuarios */}
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/playlist" element={<PlayList />} /> {/* Ruta para ver las playlists del usuario */}
            <Route path="/albumes" element={<Album />} /> {/* Importa la página Album */}
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/create-playlist" element={<CreatePlaylistPage />} /> {/* Nueva ruta para crear playlist */}
            <Route path="/songs" element={<SongsPage />} /> {/* Nueva ruta para la página de canciones */}
            <Route path="/actualizar-contraseña" element={<ActualizarContraseña />} /> {/* Nueva ruta para ActualizarContraseña */}
          </Routes>
          <Player /> {/* Asegura que el reproductor esté siempre visible */}
        </BrowserRouter>
      </div>
    </PlayerProvider>
  );
}

export default App;
