const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path'); // Importa el módulo path

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Servir la carpeta de uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./routes/auth')); // Autenticación
app.use('/api/admin', require('./routes/admin')); // Funciones de administración
app.use('/api/upload', require('./routes/uploadRoutes')); // Subidas de archivos
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/albums', require('./routes/albumRoutes'));


// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
