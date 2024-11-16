const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritos: {
    canciones: [{
      type: Schema.Types.ObjectId,
      ref: 'Song',
    }],
    albumes: [{
      type: Schema.Types.ObjectId,
      ref: 'Album',
    }],
  },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  }],
  seguidores: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  siguiendo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  tipo: {
    type: String,
    enum: ['usuario', 'administrador'],
    default: 'usuario',
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
  imagen_perfil: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
