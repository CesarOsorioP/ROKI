const SubscriptionSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
