const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const PlaylistSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    canciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    publica: {
        type: Boolean,
        default: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    imagen_portada: {
        type: String,
        required: true,
    },
    });

    module.exports = mongoose.model('Playlist', PlaylistSchema);
