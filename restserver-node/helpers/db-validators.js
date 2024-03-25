const { Role,
        Categoria,
        Producto,
        Usuario } = require('../models')

const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne( { rol });

    if( !existeRol ){
        throw new Error( `El rol ${ rol } no esta registrado en la BD`);
    };

};

const existeUsuarioById = async ( id = '' ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(` El id no existe ${ id } `);
    }
}

const usernameExiste = async ( nombre = '' ) => {

    const existeUsername = await Usuario.findOne( { nombre } );

    if( existeUsername ){
        throw new Error( `El username: ${ nombre } ya está registrado` );
    }
}

const coleccionesPermitidas = ( coleccion = '', coleccionesPermitidas = [] ) => {

    const incluida = coleccionesPermitidas.includes( coleccion );

    if( !incluida ){
        throw new Error(`La colección ${ coleccion } no es permitida, ${ coleccionesPermitidas }`)
    }

    return true;
}

const existeCategoria = async( id = '' ) => {
    const categoriaExistente = await Categoria.findById( id );
    if( !categoriaExistente ){
        throw new Error(`El id no pertence a ninguna categoria ${ id }`);
    }
}

const existeProducto = async( id = '' ) => {
    const productoExistente = await Producto.findById( id );
    if( !productoExistente ){
        throw new Error(`El id no pertence a ningun producto ${ id }`)
    }

    return true;
}

const validarPrecio = ( precio = 0 ) => {
    if( precio <= 0 ){
        throw new Error('El precio ingresado debe de ser mayor a 0')
    }

    return true;
}

const validarExistencia = ( existencia = 0 ) => {
    if( existencia <= 0 ){
        throw new Error('La existencia ingresada debe de ser mayor a 0')
    }

    return true;
}

module.exports = {
    coleccionesPermitidas,
    esRolValido,
    existeCategoria,
    existeProducto,
    existeUsuarioById,
    validarExistencia,
    validarPrecio,
    usernameExiste
}