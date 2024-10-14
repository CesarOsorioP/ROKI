const PlaybackSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cancion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    fecha_reproduccion: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Playback', PlaybackSchema);
