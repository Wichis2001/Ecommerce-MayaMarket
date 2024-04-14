const { Schema, model } = require('mongoose');
const Servicio = require('./servicio');

const ContratoSchema = Schema({
    total: {
        type: Number,
        required: [ true, 'El total a pagar por el contrato es obligatorio']
    },
    fecha: {
        type: Date,
        required: [ true, 'La fecha del contrato es obligatoria'],
        default: Date.now
    },
    usuario_contratado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El usuario contratado es un campo obligatorio' ]
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [ true, 'El servicio es obligatorio']
    },
});

module.exports = model( 'Contrato', ContratoSchema );