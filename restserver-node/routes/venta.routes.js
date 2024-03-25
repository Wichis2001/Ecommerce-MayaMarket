const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT } = require('../middlewares');
const { crearVenta, seguimientoPedidos, top10ProductosMasVendidos, top5ClientesMasGanancias, top5ClientesMasProductosVendidos, top10ClientesMasPedidos } = require('../controllers/venta.controller');


const router = Router();


//? Crear venta - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    validarCampos
], crearVenta );

router.get('/', [
    validarJWT,
], seguimientoPedidos );

router.get('/productos-vendidos/:fechaInicio/:fechaFin', [
    check('fechaInicio', 'Fecha de inicio inválida').isISO8601(),
    check('fechaFin', 'Fecha de fin inválida').isISO8601(),
    validarCampos
], top10ProductosMasVendidos );

router.get('/clientes-ganancias/:fechaInicio/:fechaFin', [
    check('fechaInicio', 'Fecha de inicio inválida').isISO8601(),
    check('fechaFin', 'Fecha de fin inválida').isISO8601(),
    validarCampos
], top5ClientesMasGanancias );

router.get('/clientes-productos/:fechaInicio/:fechaFin', [
    check('fechaInicio', 'Fecha de inicio inválida').isISO8601(),
    check('fechaFin', 'Fecha de fin inválida').isISO8601(),
    validarCampos
], top5ClientesMasProductosVendidos );

router.get('/clientes-pedidos/:fechaInicio/:fechaFin', [
    check('fechaInicio', 'Fecha de inicio inválida').isISO8601(),
    check('fechaFin', 'Fecha de fin inválida').isISO8601(),
    validarCampos
], top10ClientesMasPedidos );

module.exports = router;