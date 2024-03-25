const { response } = require("express");
const { Tarjeta } = require('../models');


const crearTarjeta = async ( req, res = response ) => {

    const { tarjeta, ...body } = req.body;

    //!Generar Data que se va a almacenar
    const data = {
        usuario: req.usuario._id,
        tarjeta: ocultarTarjeta( tarjeta )
    };

    const tarjetaUsuario = new Tarjeta( data )

    //?GuardarDB
    await tarjetaUsuario.save();

    res.status( 201 ).json( tarjetaUsuario );

}

const obtenerTarjeta = async( req, res = response ) => {

    const query = { usuario: req.usuario._id };
    const tarjetaEncontrada = await Tarjeta.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')
    if( tarjetaEncontrada.length > 0 ){
        const { tarjeta } = tarjetaEncontrada[0]
        res.status( 200 ).json( {
            tarjeta
        })
    } else {
        res.status( 200 ).json( {
            tarjeta: 'NO HAY'
        })
    }
}

const ocultarTarjeta = ( numeroTarjeta = '' ) => {
    const ultimosDigitos = numeroTarjeta.slice( -4 );
    const oculto = '*'.repeat(numeroTarjeta.length - 4 )

    const resultado = oculto + ultimosDigitos;
    return resultado;
}

module.exports = {
    crearTarjeta,
    obtenerTarjeta
}