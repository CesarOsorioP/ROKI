const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Artist = require('../models/Artist');

const JWT_SECRET = 'tu_secreto';
const EMAIL_USER = 'sgesama1@gmail.com'; // Cambia esto por tu correo
const EMAIL_PASS = 'yefh ayeh knot usgx'; // Cambia esto por tu contraseña o clave de aplicación

// Configuración de transporte para nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Recuperar contraseña
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email }) ||
               await Admin.findOne({ email }) ||
               await Artist.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'El correo no está registrado' });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `http://localhost:3000/actualizar-contraseña?token=${resetToken}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: `<p>Haga clic en el enlace para restablecer su contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Correo enviado con éxito. Revisa tu bandeja de entrada.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Resetear la contraseña
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = await User.findById(decoded.id) ||
               await Admin.findById(decoded.id) ||
               await Artist.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Cambiar contraseña
exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    let user = await User.findOne({ email }) ||
               await Admin.findOne({ email }) ||
               await Artist.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (currentPassword !== user.password) {
      return res.status(400).json({ msg: 'La contraseña actual no es correcta' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

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

    const token = jwt.sign({ id: user._id, userType }, JWT_SECRET, { expiresIn: '1h' });

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
