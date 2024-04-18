const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    fecha: {
        type: Date,
        required: [ true, 'La fecha de la venta es obligatoria'],
        default: Date.now
    },
    fecha_entrega: {
        type: Date,
        required: [ true, 'La fecha de entrega es obligatoria'],
        default: () => {
            let today = new Date();
            today.setDate( today.getDate() + 5 )
            return today;
        }
    },
    usuario_comprador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El usuario al que está asociado la compra es obligatorio' ]
    },
    total: {
        type: Number,
        required: [ true, 'El total de la venta es obligatoria']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [ true, 'El producto es obligatorio']
    },
    cantidad: {
        type: Number,
        required: [ true, 'La cantidad a adquirir es obligatoria']
    }
});

module.exports = model( 'Venta', VentaSchema );