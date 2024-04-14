const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        esCommonRole} = require('../middlewares');

const { existeCategoria,
        validarPrecio,
        validarExistencia,
        existeProducto,
        existeUsuarioById} = require('../helpers');

const { crearProducto,
        obtenerProductos,
        obtenerProductosEnVenta,
        obtenerProducto,
        actualizarProducto,
        borrarProducto,
        obtenerTodoslosProductos,
        aprobarProducto,
        rechazarProducto,
        clientesProductosOfreciendoVentas} = require('../controllers/producto.controller');

const router = Router();

//!Obtener todas las categorias - privado
router.get( '/', [
    validarJWT,
],obtenerProductos );

router.get( '/package', obtenerTodoslosProductos );

router.get( '/ventas-producto', clientesProductosOfreciendoVentas );

router.get( '/venta/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
], obtenerProductosEnVenta );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto );

//? Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precio no es valido').isFloat().custom( validarPrecio ),
    check('existencia', 'La existencia ingresada no es valida').isInt().custom( validarExistencia ),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto );

//? Actualizar - privado - cualquiera con un token valido
router.put('/aprobar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], aprobarProducto );

//? Actualizar - privado - cualquiera con un token valido
router.put('/rechazar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], rechazarProducto );

//? Actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto );

//* Borrar una categoría - privado - exclusivo admin
router.delete('/:id', [
    validarJWT,
    esCommonRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto);

module.exports = router;