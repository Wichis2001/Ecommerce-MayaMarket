const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido,
        usernameExiste } = require('../helpers');
        
const { validarCampos,
        validarJWT,
        esCommonRole} = require('../middlewares');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete,
        aprobarUsuario,
        rechazarUsuario,
        obtenerUsuarios,
        depositarQuetzales,
        cambioQuetzalCacao,
        cambioCacaoQuetzal} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de contener más de 6 caracteres').isLength( { min: 6 } ),
    check('nombre').custom( usernameExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

//? Actualizar - privado - cualquiera con un token valido
router.put('/aprobar/:nombre', [
    validarJWT,
    validarCampos
], aprobarUsuario );

//? Actualizar - privado - cualquiera con un token valido
router.put('/rechazar/:nombre', [
    validarJWT,
    validarCampos
], rechazarUsuario );

//? Agregar Quetzales al usuario
router.put(`/depositarQuetzales/:cantidad`, [
    
    validarCampos
], depositarQuetzales );

//?Cambiar Quetzales - Cacao
router.put('/cambioQuetzalesCacao/:cantidad', [
    validarJWT,
    validarCampos
], cambioQuetzalCacao );

//?Cambiar Cacao - Quetzales
router.put('/cambioCacaoQuetzales/:cantidad', [
    validarJWT,
    validarCampos
], cambioCacaoQuetzal );


router.get( '/obtener', obtenerUsuarios );

module.exports = router;