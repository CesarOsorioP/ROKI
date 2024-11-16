// middleware/auth.js
// Nota: Este cambio es para fines de desarrollo únicamente y no debe usarse en producción

module.exports = (req, res, next) => {
  // Temporalmente omitir la verificación del token
  console.warn('Acceso sin verificación de token permitido temporalmente');

  // Avanza sin hacer la verificación de token
  next();
};
