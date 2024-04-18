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
    activo: {
        type: Boolean,
        required: true,
        default: true
    },
    aprobado: {
        type: Boolean,
        required: true,
        default: false
    },
    rechazado: {
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