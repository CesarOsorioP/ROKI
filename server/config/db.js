const mongoose = require('mongoose');

    const connectDB = async () => {
    try {
      
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    } catch (err) {
        console.error('Error de conexión a MongoDB:', err.message);
        process.exit(1);
    }
    };

    module.exports = connectDB;
