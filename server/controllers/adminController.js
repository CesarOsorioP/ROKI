const Admin = require('../models/Admin');
const Artist = require('../models/Artist');
const User = require('../models/User');

// Crear un nuevo administrador
exports.crearAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Datos recibidos:', req.body); // Agrega esto para verificar los datos

    try {
        const newAdmin = new Admin({ username, email, password, tipo: 'administrador' });
        await newAdmin.save();
        res.status(201).json({ msg: 'Administrador creado exitosamente', admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear administrador' });
    }
};

// Editar un administrador existente
exports.editarAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ msg: 'Administrador no encontrado' });
        }
        res.json({ msg: 'Administrador actualizado', admin: updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar administrador' });
    }
};

// Crear un nuevo artista
// Crear un nuevo artista
exports.crearArtista = async (req, res) => {
    const { nombre_artistico, nombre_real, apellido_real, nacionalidad, edad, email, password } = req.body;

    // Validaciones básicas
    if (!nombre_artistico || !nombre_real || !apellido_real || !nacionalidad || !edad || !email || !password) {
        return res.status(400).json({ msg: 'Faltan campos requeridos' });
    }

    try {
        const newArtist = new Artist({ 
            nombre_artistico, 
            nombre_real, 
            apellido_real, 
            nacionalidad, 
            edad, 
            email, 
            password, 
            tipo: 'artista' 
        });
        await newArtist.save();
        res.status(201).json({ msg: 'Artista creado exitosamente', artist: newArtist });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
        }
        res.status(500).json({ msg: 'Error al crear artista' });
    }
};

// Editar un artista existente
exports.editarArtista = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedArtist) {
            return res.status(404).json({ msg: 'Artista no encontrado' });
        }
        res.json({ msg: 'Artista actualizado', artist: updatedArtist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar artista' });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password, tipo: 'usuario' });
        await newUser.save();
        res.status(201).json({ msg: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear usuario' });
    }
};

// Editar un usuario existente
exports.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json({ msg: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar usuario' });
    }
};

// Editar música (ejemplo para actualizar un título de canción)
