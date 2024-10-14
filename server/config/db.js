const mongoose = require('mongoose');

    const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gesakro:whch520pentakiller%3F%3FREYN4@cluster0.f4tc9.mongodb.net/roki_db?retryWrites=true&w=majority', {
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
