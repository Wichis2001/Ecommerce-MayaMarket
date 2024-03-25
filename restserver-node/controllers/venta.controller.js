const moment = require('moment');

const { response } = require("express");
const { Producto, Venta } = require('../models');

const crearVenta = async ( req, res = response ) => {
    try{
        const { estado, fecha, fecha_entrega, usuario_comprador, productos, ...body } = req.body;

        //!Generar Data que se va a almacenar
        const data = {
            productos,
            ...body,
            usuario_comprador: req.usuario._id,
        };
        for( const prod of productos ){
            const { producto, cantidad } = prod;
            const productoElegido = await Producto.findById( producto._id );
            productoElegido.existencia = productoElegido.existencia - cantidad;
            if( productoElegido.existencia === 0 ){
                productoElegido.estado = false;
            }
            await productoElegido.save();
        }

        const venta = new Venta( data )

        //?GuardarDB

        await venta.save();

        res.status( 201 ).json( venta );
    } catch( err ){
        console.log( err )
        res.status( 500 ).json({
            err: 'Existe un error al ejecutar la consulta en el servidor'
        });
    }

}

const seguimientoPedidos = async ( req, res = response ) => {
    const query = { usuario_comprador:  req.usuario };

    const ventas = await Venta.find( query )
                            .select('estado productos.producto fecha_entrega')
                            .populate('productos.producto','nombre')


    res.status( 200 ).json( ventas )
}

const top10ClientesMasPedidos = async (req, res = response) => {
  try {

    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas de inicio y fin estén presentes en la consulta
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        error: 'Debe proporcionar las fechas de inicio y fin'
      });
    }

    // Convertir las fechas a objetos Date
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: 'Las fechas proporcionadas no son válidas'
      });
    }
    
    const topClientes = await Venta.aggregate([
      {
        $addFields: {
          fecha: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } }
        }
      },
      {
        $match: {
          fecha: {
            $gte: startDate.toISOString().slice(0, 10),
            $lte: endDate.toISOString().slice(0, 10)
          }
        }
      },
      {
        $group: {
          _id: '$usuario_comprador',
          totalCompras: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'usuarios', // Nombre de la colección de usuarios
          localField: '_id',
          foreignField: '_id',
          as: 'usuario'
        }
      },
      {
        $project: {
          _id: 0,
          nombreUsuario: { $arrayElemAt: ['$usuario.nombre', 0] },
          totalCompras: 1
        }
      },
      { $sort: { totalCompras: -1 } },
      { $limit: 10 }
    ]);

    res.json(topClientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener los top clientes' });
  }
};

const top5ClientesMasGanancias = async (req, res = response) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas de inicio y fin estén presentes en la consulta
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        error: 'Debe proporcionar las fechas de inicio y fin'
      });
    }

    // Convertir las fechas a objetos Date
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: 'Las fechas proporcionadas no son válidas'
      });
    }
    const topClientes = await Venta.aggregate([
      {
        $addFields: {
          fecha: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } }
        }
      },
      {
        $match: {
          fecha: {
            $gte: startDate.toISOString().slice(0, 10),
            $lte: endDate.toISOString().slice(0, 10)
          }
        }
      },
      { $unwind: '$productos' },
      {
        $lookup: {
          from: 'productos', // Nombre de la colección de productos
          localField: 'productos.producto',
          foreignField: '_id',
          as: 'producto'
        }
      },
      { $unwind: '$producto' },
      {
        $group: {
          _id: '$producto.usuario',
          totalProductos: { $sum: '$productos.cantidad' }
        }
      },
      { $sort: { totalProductos: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'usuarios', // Nombre de la colección de usuarios
          localField: '_id',
          foreignField: '_id',
          as: 'usuario'
        }
      },
      {
        $project: {
          _id: 0,
          nombreUsuario: { $arrayElemAt: ['$usuario.nombre', 0] },
          totalProductos: 1
        }
      }
    ]);

    res.json(topClientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener los top clientes' });
  }
};

const top5ClientesMasProductosVendidos = async ( req, res = response ) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas de inicio y fin estén presentes en la consulta
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        error: 'Debe proporcionar las fechas de inicio y fin'
      });
    }


    // Convertir las fechas a objetos Date
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: 'Las fechas proporcionadas no son válidas'
      });
    }

    const topClientes = await Venta.aggregate([
      {
        $addFields: {
          fecha: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } }
        }
      },
      {
        $match: {
          fecha: {
            $gte: startDate.toISOString().slice(0, 10),
            $lte: endDate.toISOString().slice(0, 10)
          }
        }
      },
      { $unwind: '$productos' },
      {
        $lookup: {
          from: 'productos',
          localField: 'productos.producto',
          foreignField: '_id',
          as: 'producto'
        }
      },
      { $unwind: '$producto' },
      {
        $group: {
          _id: '$producto.usuario',
          totalProductos: { $sum: '$productos.cantidad' }
        }
      },
      {
        $lookup: {
          from: 'usuarios',
          localField: '_id',
          foreignField: '_id',
          as: 'usuario'
        }
      },
      {
        $project: {
          _id: 0,
          nombreUsuario: { $arrayElemAt: ['$usuario.nombre', 0] },
          totalProductos: 1
        }
      },
      { $sort: { totalProductos: -1 } },
      { $limit: 5 }
    ]);

    res.json(topClientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener los top clientes' });
  }
};

const top10ProductosMasVendidos = async (req, res = response) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas de inicio y fin estén presentes en la consulta
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        error: 'Debe proporcionar las fechas de inicio y fin'
      });
    }


    // Convertir las fechas a objetos Date
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: 'Las fechas proporcionadas no son válidas'
      });
    }
    // Agrupa los productos por su ID y calcula la suma de las cantidades vendidas
    const productosVendidos = await Venta.aggregate([
      {
        $unwind: '$productos'
      },
      {
        $addFields: {
          fecha: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } }
        }
      },
      {
        $match: {
          fecha: {
            $gte: startDate.toISOString().slice(0, 10),
            $lte: endDate.toISOString().slice(0, 10)
          }
        }
      },
      {
        $group: {
          _id: '$productos.producto',
          totalVentas: { $sum: '$productos.cantidad' }
        }
      },
      {
        $sort: {
          totalVentas: -1
        }
      },
      {
        $limit: 10
      }
    ]);

    // Obtiene los detalles de los productos más vendidos
    const productos = await Producto.find({ _id: { $in: productosVendidos.map(p => p._id) } });

    // Crea un objeto con los resultados deseados (nombre del producto y cantidad de ventas)
    const topProductos = productosVendidos.map(p => {
      const producto = productos.find(prod => prod._id.toString() === p._id.toString());
      return {
        nombre: producto.nombre,
        cantidadVentas: p.totalVentas
      };
    });
    res.json(topProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor'
    });
  }
};


module.exports = {
    crearVenta,
    seguimientoPedidos,
    top10ProductosMasVendidos,
    top5ClientesMasGanancias,
    top5ClientesMasProductosVendidos,
    top10ClientesMasPedidos
}