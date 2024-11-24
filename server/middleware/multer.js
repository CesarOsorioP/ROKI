const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar los archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardar en la carpeta "uploads"
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// Filtro de archivos: Solo imágenes y audios permitidos
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Only image and audio files are allowed'), false); // Rechaza el archivo
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
