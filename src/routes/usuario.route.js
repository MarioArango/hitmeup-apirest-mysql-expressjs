const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const usuario_controller = require('../controller/usuario.controller');

router.get('/listar-comunidad/:id_usuario',usuario_controller.listar_comunidad_usuario);
router.post('/login',usuario_controller.login);
router.put('/cambiar-conexion-usuario',usuario_controller.cambiar_conexion_usuario);
router.post('/recuperar-password',usuario_controller.recuperar_password);

module.exports = router;