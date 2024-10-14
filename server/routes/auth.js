const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para el registro
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    user = new User({
      username,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña
      if (user.password !== password) {
        return res.status(400).json({ msg: 'Contraseña incorrecta' });
      }
  
      res.status(200).json({ msg: 'Inicio de sesión exitoso' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  
  module.exports = router;
