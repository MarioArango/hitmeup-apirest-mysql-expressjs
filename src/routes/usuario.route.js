const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const usuario_controller = require('../controller/usuario.controller');

router.get('/listar-comunidad/:id_usuario',usuario_controller.listar_comunidad_usuario);
router.post('/login',usuario_controller.login);
router.put('/cambiar-conexion-usuario',usuario_controller.cambiar_conexion_usuario);
router.put('/recuperar-password',usuario_controller.recuperar_password);
router.post('/modificar-perfil', usuario_controller.modificar_perfil);
router.post('/cambiar-password',usuario_controller.cambiar_password);
router.put('/cargar-imagen',usuario_controller.cargar_imagen);

module.exports = router;    