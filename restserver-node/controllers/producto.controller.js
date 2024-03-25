const { response } = require("express");
const { Producto, Categoria, Usuario } = require('../models');


const crearProducto = async ( req, res = response ) => {

    const { estado, aprobado, usuario, ...body } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    //!Generar Data que se va a almacenar
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id,
    };

    const producto = new Producto( data )

    //?GuardarDB

    await producto.save();

    res.status( 201 ).json( producto );
}

const obtenerProductos = async ( req, res = response ) => {
    const query = { estado: true, aprobado: true, usuario: { $ne:  req.usuario } };

    const productos = await Producto.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')
                                    .populate('categoria','nombre')


    res.status( 200 ).json( productos )

}

const obtenerTodoslosProductos = async ( req, res = response ) => {
    const query = { estado: true, aprobado: false, rechazado: false };

    const productos = await Producto.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')
                                    .populate('categoria','nombre')


    res.status( 200 ).json( productos )

}

const obtenerProductosEnVenta = async ( req, res = response ) => {
    const { id } = req.params;
    const query = { estado: true , usuario: id };

    const productos = await Producto.find( query )
                                    .populate('usuario', '_id')
                                    .populate('usuario', 'nombre')
                                    .populate('categoria','nombre')


    res.status( 200 ).json( productos )

}

const obtenerProducto = async ( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id )
                                     .populate('usuario', 'nombre')
                                     .populate('categoria','nombre');

    res.status( 200 ).json( producto )

}

const actualizarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    if( data.nombre ){

        data.nombre = data.nombre.toUpperCase();

    }
    data.usuario= req.usuario._id;
    data.rechazado = false;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.status( 200 ).json( producto );

}

const borrarProducto = async ( req, res = response ) => {

    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

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