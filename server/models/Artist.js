const ArtistSchema = new Schema({
    nombre_artistico: {
        type: String,
        required: true,
    },
    nombre_real: {
        type: String,
        required: true,
    },
    apellido_real: {
        type: String,
        required: true,
    },
    nacionalidad: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    seguidores: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    albumes: [{
        type: Schema.Types.ObjectId,
        ref: 'Album',
    }],
    eps: [{
        type: Schema.Types.ObjectId,
        ref: 'EP',
    }],
    canciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    imagen_perfil: {
        type: String,
    },
});

module.exports = mongoose.model('Artist', ArtistSchema);
