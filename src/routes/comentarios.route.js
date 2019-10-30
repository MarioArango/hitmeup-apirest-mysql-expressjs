const express = require("express")
const router = express.Router();
const comentarios_controller = require('..//controller/comentarios.controller');

router.post('/agregar-comentario', comentarios_controller.agregar_comentario);
router.post('/editar-comentario',comentarios_controller.editar_comentario);
router.put('/cambiar-estado-comentario', comentarios_controller.cambiar_estado_comentario);
module.exports = router;