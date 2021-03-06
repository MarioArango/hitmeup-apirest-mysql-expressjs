const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const publicaciones_controller = require('../controller/publicaciones.controller');

router.get('/listar-publicaciones',publicaciones_controller.listar_todas_publicaciones);
router.get('/listar-publicaciones-usuario/:id_usuario',publicaciones_controller.listar_publicaciones_de_usuario);
router.post('/agregar-publicacion',publicaciones_controller.agregar_publicacion);
router.post('/editar-publicacion',publicaciones_controller.editar_publicacion);
router.put('/cambiar-estado-publicacion',publicaciones_controller.cambiar_estado_publicacion);

module.exports = router; 