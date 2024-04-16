const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models');

const usuariosGet = ((req = request, res = response) => {
    const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
});

const usuariosPost = ( async (req, res = response) => {

    //!Pequeña validación
    const { nombre, password, rol } = req.body;

    const usuario = new Usuario( { nombre, password, rol } );

    //?Encriptar la contraseña
    //Número de vueltas que se daran para hacer más complicada su desincriptación, por defecto en 10
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //*Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario,
        token,
        ok: true
    })
});

const usuariosPut  = ((req, res = response) => {

    const { id } = req.params;
    res.json({
        msg: 'put Api - controlador',
        id
    });
});

const usuariosPatch = ((req, res) => {
    res.json({
        msg: 'patch Api - controlador'
    });
});

const usuariosDelete = ((req, res = response) => {
    res.json({
        msg: 'delete Api - controlador'
    });
});

const aprobarUsuario = async ( req, res = response ) => {

    const { estado, ...data } = req.body

    data.aprobado = true;

    const usuario = await Usuario.findByIdAndUpdate( data.uid, data, { new: true } );

    res.status( 200 ).json( usuario );
}

const rechazarUsuario = async ( req, res = response ) => {
    const { estado, ...data } = req.body

    data.estado = false

    const usuario = await Usuario.findByIdAndUpdate( data.uid, data, { new: true } );

    res.status( 200 ).json( usuario );
}

const obtenerUsuarios = async ( req, res = response ) => {
    const { id } = req.params;
    const query = { aprobado: false, estado: true };

    const productos = await Usuario.find( query )

    res.status( 200 ).json( productos )

}

const depositarQuetzales = async ( req, res = response ) => {
    const { cantidad, ...data } = req.body

    const usuario = 

    if( isNaN(cantidad )){
        return res.status(400).json({
            error: 'Error, se ha intentado realizar una consulta no numerica'
        });
    }

    data.quetzales = data.quetzales + cantidad;

    const usuario = await Usuario.findByIdAndUpdate( data.uid, data, { new: true } );

    res.status( 200 ).json({
        msg: `Se han depositado Q${ cantidad }, ahora tienes Q${ data.quetzales} en tu cuenta`,
        usuario
    });
}

const cambioQuetzalCacao = async ( req, res = response ) => {
    const { cantidad, ...data } = req.body

    if( isNaN(cantidad )){
        return res.status(400).json({
            error: 'Error, se ha intentado realizar una consulta no numerica'
        });
    }

    if( data.quetzal < cantidad ){
        return res.status(400).json({
            error: 'Error, no posees la cantidad de quetzales necesarios para poder realizar la transacción'
        });
    }

    data.cacao = data.cacao + (cantidad * 5);

    const usuario = await Usuario.findByIdAndUpdate( data.uid, data, { new: true } );

    res.status( 200 ).json({
        msg: `Se han depositado C${ cantidad }, ahora tienes C${ data.quetzales} en tu cuenta`,
        usuario
    });
}

const cambioCacaoQuetzal = async ( req, res = response ) => {
    const { cantidad, ...data } = req.body

    if( isNaN(cantidad )){
        return res.status(400).json({
            error: 'Error, se ha intentado realizar una consulta no numerica'
        });
    }

    if( data.cacao < cantidad ){
        return res.status(400).json({
            error: 'Error, no posees la cantidad de cacao coins necesarios para poder realizar la transacción'
        });
    }

    data.cacao = data.cacao + (cantidad * 5);

    const usuario = await Usuario.findByIdAndUpdate( data.uid, data, { new: true } );

    res.status( 200 ).json({
        msg: `Se han depositado C${ cantidad }, ahora tienes C${ data.quetzales} en tu cuenta`,
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    aprobarUsuario,
    rechazarUsuario,
    obtenerUsuarios,
    depositarQuetzales,
    cambioCacaoQuetzal,
    cambioQuetzalCacao
}