const { Schema, model } = require('mongoose');

const TarjetaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El usuario al que está asociado la tarjeta es obligatoria' ]
    },
    tarjeta: {
        type: String,
        required: [ true, 'El número de tarjeta asociado al comprador es obligatorio']
    },
});

module.exports = model( 'Tarjeta', TarjetaSchema );