const Admin = require('../models/Admin');
const Artist = require('../models/Artist');
const User = require('../models/User');

// Crear un nuevo administrador
const crearAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

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
const editarAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

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
const crearArtista = async (req, res) => {
  const { nombre_artistico, nombre_real, apellido_real, nacionalidad, edad, email, password } = req.body;

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
      tipo: 'artista',
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
const editarArtista = async (req, res) => {
  const { id } = req.params;
  const { nombre_artistico, email, password } = req.body;

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { nombre_artistico, email, password },
      { new: true }
    );

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
const crearUsuario = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

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
const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({ msg: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
};

// Buscar usuarios
const searchUsuario = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ message: "El parámetro 'search' es obligatorio" });
    }

    const users = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error en searchUsuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Exportar todos los controladores
module.exports = {
  crearAdmin,
  editarAdmin,
  crearArtista,
  editarArtista,
  crearUsuario,
  editarUsuario,
  searchUsuario,
};
