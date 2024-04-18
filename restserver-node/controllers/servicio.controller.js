const { response } = require("express");
const { Servicio, Producto, Usuario } = require('../models');


const crearServicio = async ( req, res = response ) => {

    const { activo, aprobado, usuario, ...body } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    //!Generar Data que se va a almacenar
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id,
    };

    const servicio = new Servicio( data )

    //?GuardarDB

    await servicio.save();

    res.status( 201 ).json( servicio );
}

const obtenerServicio = async ( req, res = response ) => {

  const { id } = req.params;

  const servicio = await Servicio.findById( id )
                                   .populate('usuario', 'nombre')

  res.status( 200 ).json( producto )

}
module.exports = {
    crearServicio
}