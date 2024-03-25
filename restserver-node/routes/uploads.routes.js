const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo,
        mostrarImagen,
        actualizarImagen } = require('../controllers/uploads.controller');

const { validarArchivoSubir,
        validarCampos } = require('../middlewares');

const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post( '/', validarArchivoSubir, cargarArchivo);

router.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
], actualizarImagen );

router.get( '/:coleccion/:id',[
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
], mostrarImagen );


module.exports = router;