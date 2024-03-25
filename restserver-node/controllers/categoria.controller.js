const { response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async ( req, res = response ) => {

    const query = { estado: true };

    const categorias =  await Categoria.find( query )

    res.status( 200 ).json( categorias )
}

module.exports = {
    obtenerCategorias
}