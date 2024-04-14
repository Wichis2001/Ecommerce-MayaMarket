const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    img: {
        type: String,
    },
    pago: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El usuario al que está asociado es obligatorio' ]
    },
    estado: {
        type: String,
        required: [ true, 'El estado de la venta es obligatorio' ],
        enum: [ 'EN_ESPERA', 'EN_EJECUCION', 'CULMINADO'],
        default: 'EN_ESPERA'
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    },
    aprobado: {
        type: Boolean,
        required: true,
        default: false
    }
});

ServicioSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Servicio', ServicioSchema );