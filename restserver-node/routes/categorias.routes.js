const { Router } = require('express');

const { obtenerCategorias } = require('../controllers/categoria.controller');

const router = Router();

//!Obtener todas las categorias - público
router.get( '/', obtenerCategorias );

module.exports = router;