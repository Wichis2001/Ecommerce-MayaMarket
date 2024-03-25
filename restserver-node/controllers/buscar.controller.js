const { response } = require("express");
const { ObjectId } = require("mongoose").Types;


const { Producto } = require('../models')

const coleccionesPermitidas = [
    'productos',
];

const buscarProductos = async ( termino, req, res ) => {

    const { limite = 6, desde = 0} = req.query;
    //!Lo hace insensible a las mayusculas y minusculas y me ayuda a hacer busquedas más amplias
    const regex = new RegExp( termino, 'i' );

    //?También se puede validad un and o un where para hacer la búsqueda más completa
    const productos = await Producto.find( { nombre: regex,  estado: true, aprobado: true, usuario: { $ne:  req.usuario }} )
                                    .limit( Number( limite ) )
                                    .skip( Number( desde ))
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre');

    return res.status( 200 ).json( productos )
}

const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    };

    switch ( coleccion ) {
        case 'productos':
            buscarProductos( termino, req, res );
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer está búsqueda :('
            });
    }
}

module.exports = {
    buscar
}