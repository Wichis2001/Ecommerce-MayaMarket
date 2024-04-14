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

const obtenerMisServicios = async ( req, res = response ) => {
    const query = { activo: true, aprobado: true, usuario: { $ne:  req.usuario } };

    const servicios = await Producto.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')


    res.status( 200 ).json( servicios )

}


const obtenerServicios = async ( req, res = response ) => {
    const { id } = req.params;
    const query = { activo: true, estado: 'EN_ESPERA', usuario: id };

    const servicios = await Servicio.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')

    res.status( 200 ).json( servicios )

}

const obtenerServicio = async ( req, res = response ) => {

    const { id } = req.params;

    const servicio = await Servicio.findById( id )
                                     .populate('usuario', 'nombre')

    res.status( 200 ).json( servicio )

}

const actualizarServicio = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    if( data.nombre ){

        data.nombre = data.nombre.toUpperCase();

    }
    data.usuario= req.usuario._id;
    data.aprobado = false;

    const servicio = await Servicio.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( servicio );

}

const borrarServicio= async ( req, res = response ) => {

    const { id } = req.params;

    const servicioEliminado = await Servicio.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( productoEliminado );
}

const aprobarProducto = async ( req, res = response ) => {

    const { id } = req.params;

    const { estado, usuario, ...data} = req.body;

    data.aprobado = true;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( producto );
}

const rechazarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    
    const { estado, usuario, ...data} = req.body;
    data.aprobado = false;
    data.rechazado = true

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( producto );
}

const clientesProductosOfreciendoVentas = async (req, res = response) => {
  try {
    const topClientes = await Producto.aggregate([
      {
        $match: {
          estado: true, // solo productos que esten activos
          aprobado: true // solo productos aprobados
        }
      },
      {
        $group: {
          _id: "$usuario",
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "usuarios", // nombre de la coleccion de usuarios
          localField: "_id",
          foreignField: "_id",
          as: "usuario"
        }
      },
      {
        $project: {
          nombreUsuario: { $arrayElemAt: ["$usuario.nombre", 0] },
          count: 1
        }
      }
    ]);
    res.json(topClientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los productos más vendidos"
    });
  }
};

module.exports = {
    actualizarProducto,
    aprobarProducto,
    rechazarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    obtenerProductosEnVenta,
    obtenerTodoslosProductos,
    clientesProductosOfreciendoVentas
}