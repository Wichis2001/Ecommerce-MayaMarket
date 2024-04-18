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

  res.status( 200 ).json( servicio )
}

const actulizarServicio = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    if( data.nombre ){

        data.nombre = data.nombre.toUpperCase();

    }
    data.usuario= req.usuario._id;
    data.aprobado = false;
    data.rechazado = false;

    const servicio = await Servicio.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( servicio );

}

const borrarServicio = async ( req, res = response ) => {

    const { id } = req.params;

    const servicioEliminado = await Servicio.findByIdAndUpdate( id, { activo: false }, { new: true } );

    res.json( servicioEliminado );
}

const obtenerTodosLosServicios = async ( req, res = response ) => {
    const query = { activo: true, aprobado: false, rechazado: false };

    
    const servicios = await Servicio.find(query)
    .populate('usuario', '_id nombre');


    res.status( 200 ).json( servicios )

}

const aprobarServicio = async ( req, res = response ) => {

    const { id } = req.params;

    const { estado, usuario, ...data} = req.body;

    data.aprobado = true;

    const servicio = await Servicio.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( servicio );
}

const rechazarServicio = async ( req, res = response ) => {
    const { id } = req.params;
    
    const { estado, usuario, ...data} = req.body;
    data.aprobado = false;
    data.rechazado = true;

    const servicio = await Servicio.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( servicio );
}

module.exports = {
    crearServicio,
    obtenerServicio,
    actulizarServicio,
    borrarServicio,
    obtenerTodosLosServicios,
    aprobarServicio,
    rechazarServicio
}