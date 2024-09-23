const PaymentSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    suscripcion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
    },
    fecha_compra: {
        type: Date,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    metodo_pago: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
