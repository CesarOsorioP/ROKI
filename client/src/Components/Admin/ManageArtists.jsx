import React, { useState, useEffect } from 'react';
import './CreateArtist.css'

function ManageArtists() {
    const [artistData, setArtistData] = useState({
        nombre_artistico: '',
        nombre_real: '',
        apellido_real: '',
        nacionalidad: '',
        edad: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [artists, setArtists] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/artista/id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setArtists(data.artists);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    const handleCreateOrUpdateArtist = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId 
            ? `http://localhost:5000/api/admin/artista/${editingId}` 
            : 'http://localhost:5000/api/admin/artista';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(artistData),
            });

            if (response.ok) {
                setSuccess(editingId ? 'Artista actualizado exitosamente' : 'Artista creado exitosamente');
                fetchArtists(); // Refrescar la lista de artistas
                setArtistData({ 
                    nombre_artistico: '', 
                    nombre_real: '', 
                    apellido_real: '', 
                    nacionalidad: '', 
                    edad: '', 
                    email: '', 
                    password: '' 
                }); // Limpia el formulario
                setError(null);
                setEditingId(null); // Resetea el estado de edición
            } else {
                const data = await response.json();
                setError(data.msg || 'Error al gestionar el artista');
                setSuccess(null);
            }
        } catch (error) {
            console.error('Error del servidor:', error);
            setError('Error del servidor. Inténtalo de nuevo más tarde.');
            setSuccess(null);
        }
    };

    const handleEditArtist = (artist) => {
        setArtistData({
            nombre_artistico: artist.nombre_artistico,
            nombre_real: artist.nombre_real,
            apellido_real: artist.apellido_real,
            nacionalidad: artist.nacionalidad,
            edad: artist.edad,
            email: artist.email,
            password: '', // No se necesita mostrar la contraseña
        });
        setEditingId(artist._id);
    };

    return (
        <div className="manage-artists-container">
            <h2>{editingId ? 'Editar Artista' : 'Crear Nuevo Artista'}</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form className="artist-form" onSubmit={handleCreateOrUpdateArtist}>
                <input
                    className="form-input"
                    type="text"
                    name="nombre_artistico"
                    value={artistData.nombre_artistico}
                    onChange={handleInputChange}
                    placeholder="Nombre Artístico"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    name="nombre_real"
                    value={artistData.nombre_real}
                    onChange={handleInputChange}
                    placeholder="Nombre Real"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    name="apellido_real"
                    value={artistData.apellido_real}
                    onChange={handleInputChange}
                    placeholder="Apellido Real"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    name="nacionalidad"
                    value={artistData.nacionalidad}
                    onChange={handleInputChange}
                    placeholder="Nacionalidad"
                    required
                />
                <input
                    className="form-input"
                    type="number"
                    name="edad"
                    value={artistData.edad}
                    onChange={handleInputChange}
                    placeholder="Edad"
                    required
                />
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={artistData.email}
                    onChange={handleInputChange}
                    placeholder="Correo Electrónico"
                    required
                />
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    value={artistData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                    required={!editingId} // No requerir contraseña al editar
                />
                <button className="submit-btn" type="submit">{editingId ? 'Actualizar Artista' : 'Crear Artista'}</button>
            </form>

            <ul className="artists-list">
                {artists.map((artist) => (
                    <li key={artist._id} className="artist-item">
                        {artist.nombre_artistico} ({artist.email}) 
                        <button className="edit-btn" onClick={() => handleEditArtist(artist)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageArtists;
