const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const usuario_controller = require('../controller/usuario.controller');

router.get('/listar-comunidad/:id_usuario',usuario_controller.listar_comunidad_usuario);
router.get('/login',usuario_controller.login);
module.exports = router;