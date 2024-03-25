const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El usuario al que está asociado es obligatorio' ]
    },
    existencia: {
        type: Number,
        required: [true, 'La existancia del producto es obligatoria'],
        min: 0
    },
    aprobado: {
        type: Boolean,
        required: true,
        default: false
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [ true, 'La categoria es obligatoria']
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    rechazado: {
        type: Boolean,
        required: true,
        default: false
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema );