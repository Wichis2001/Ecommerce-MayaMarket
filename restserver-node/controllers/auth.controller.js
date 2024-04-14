const { response, request, json } = require("express");

const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models');
const { generarJWT } = require('../helpers');

const revalidarToken = async(req, res = response ) => {

    const usuario = req.usuario

    // Generar el JWT
    const token = await generarJWT( usuario._id );

    return res.json({
        ok: true,
        usuario,
        token
    });

}

const login = async (req = request, res = response) => {

    try{

         const { nombre, password } = req.body;

         //!Verificar si el username existe
         const usuario = await Usuario.findOne( { nombre } );

         if( !usuario ){

             return res.status( 400 ).json({
                 msg: 'El usuario ingresado no existe',
                 ok: false
             });

         }

         //?El permiso de acceso a sido removido
         if( !usuario.estado ){

            return res.status( 400 ).json({
                msg: 'No tienes acceso al sistema',
                ok: false
            });

        }

         //?Verificar que el usuario exista y que este haya sido aprobado en el sistema
         if( !usuario.aprobado ){

             return res.status( 400 ).json({
                 msg: 'Aún no has sido aprobado por un usuario',
                 ok: false
             });

         }

         //!Validar la constraseña
         const validPassorword = bcryptjs.compareSync( password, usuario.password);

         if( !validPassorword ){

             return res.status( 400 ).json({
                 msg: ' Usuario / Password no son correctos - password',
                 ok: false
             });

         }

         //*Generar el JWT
         const token = await generarJWT( usuario.id );

         res.json({
             usuario,
             token,
             ok: true
         });
 
    } catch( err ) {
         console.log( err );
         return res.status(500).json({
             msg: 'Hable con el administrador',
             ok: false
         })
    }
 }

 const agregarUsuario = ( async (req, res = response) => {

    //!Pequeña validación
    const { nombre, password } = req.body;
    const usuario = new Usuario( { nombre, password } );

    //?Encriptar la contraseña
    //Número de vueltas que se daran para hacer más complicada su desincriptación, por defecto en 10
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Generar el JWT
    const token = await generarJWT( usuario._id );

    //*Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario,
        ok: true
    })
});

const agregarUsuarioAdmin = ( async (req, res = response) => {

    //!Pequeña validación
    const { nombre, password } = req.body;
    const usuario = new Usuario( { nombre, password, rol: 'ADMIN_ROLE', aprobado: true } );

    //?Encriptar la contraseña
    //Número de vueltas que se daran para hacer más complicada su desincriptación, por defecto en 10
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Generar el JWT
    const token = await generarJWT( usuario._id );

    //*Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario,
        ok: true
    })
});
module.exports = {
    agregarUsuario,
    agregarUsuarioAdmin,
    login,
    revalidarToken
}