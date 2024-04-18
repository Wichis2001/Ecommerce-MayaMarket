const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        esCommonRole} = require('../middlewares');

const { existeServicio,
        validarPrecio,
        existeUsuarioById} = require('../helpers');

const { crearServicio,
        obtenerServicio,
        actulizarServicio,
        borrarServicio,
        obtenerTodosLosServicios,
        aprobarServicio,
        rechazarServicio} = require('../controllers/servicio.controller');

const router = Router();

router.get( '/obtenerServicios', obtenerTodosLosServicios );

//!Obtener todas las categorias - privado
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicio ),
    validarCampos
], obtenerServicio );

//? Actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicio ),
    validarCampos
], actulizarServicio );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('pago', 'El pago no es valido').isFloat().custom( validarPrecio ),
    validarCampos
], crearServicio );

router.delete('/:id', [
    validarJWT,
    esCommonRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicio ),
    validarCampos
], borrarServicio);

router.put('/aprobar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicio ),
    validarCampos
], aprobarServicio );

//? Actualizar - privado - cualquiera con un token valido
router.put('/rechazar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicio ),
    validarCampos
], rechazarServicio );

module.exports = router;