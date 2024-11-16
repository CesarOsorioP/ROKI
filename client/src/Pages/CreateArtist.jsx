import React from 'react';
import CreateArtistForm from '../Components/Admin/ManageArtists'; // Asegúrate de que la ruta sea correcta


const CreateArtist = () => {
  return (
    <div className='create-artist'>
      <CreateArtistForm />
    </div>
  );
}

export default CreateArtist