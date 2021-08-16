const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers,
} = require('../controllers/user.controller');
const {
    validatorRole,
    validatorEmail,
    existUserById
} = require('../helpers/db_validators');

const router = Router();


router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener una longitud mayor a 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( validatorEmail ),
    check('rol').custom( validatorRole ),
    validarCampos
], postUsers);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom( validatorRole ),
    validarCampos
], putUsers);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
], deleteUsers);

router.patch('/', patchUsers);

module.exports = router;