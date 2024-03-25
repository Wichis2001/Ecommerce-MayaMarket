const { Router } = require('express');
const { check } = require('express-validator');

const { login,
        revalidarToken,
        agregarUsuario} = require('../controllers/auth.controller');

const { usernameExiste } = require('../helpers');

const { validarCampos,
        validarJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('nombre', 'El username es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de contener más de 6 caracteres').isLength( { min: 6 } ),
    check('nombre').custom( usernameExiste ),
    validarCampos
], agregarUsuario);

// Validar y revalidar token
router.get( '/renew', validarJWT , revalidarToken );

module.exports = router;