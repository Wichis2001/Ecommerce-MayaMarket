const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT } = require('../middlewares');
const { crearTarjeta, obtenerTarjeta } = require('../controllers/tarjeta.controller');


const router = Router();


//? Crear tarjeta - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('tarjeta', 'La tarjeta es obligatoria y debe de contener 16 caracteres').isLength( { min: 16, max: 16 } ),
    validarCampos
], crearTarjeta );

//!Obtener todos las productos - privado
router.get( '/', [
    validarJWT,
    validarCampos
], obtenerTarjeta );

module.exports = router;