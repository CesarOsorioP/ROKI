const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Artist = require('../models/Artist');

// Controlador de login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let userType = user ? user.tipo : null;
    let name = user ? user.username : null;

    if (!user) {
      user = await Admin.findOne({ email });
      userType = user ? 'administrador' : null;
      name = user ? user.username : null;
    }

    if (!user) {
      user = await Artist.findOne({ email });
      userType = user ? 'artista' : null;
      name = user ? user.nombre_artistico : null; // Obtener el nombre artístico
    }

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (password !== user.password) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id, userType }, 'tu_secreto', { expiresIn: '1h' });

    // Responde con el token y otros detalles relevantes
    res.json({
      token,
      username: name,
      userType,
      userId: user._id, // Incluye userId en la respuesta
      artistId: userType === 'artista' ? user._id : null // Retorna el ID del artista si es relevante
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Controlador de registro
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    user = new User({ username, email, password });
    await user.save();
    
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};
