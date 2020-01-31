const express = require('express')
const router = express.Router()
const administrador_controller = require('../controller/administrador.controller')

router.post('/deshabilitar-habilitar-usuario/:_id', administrador_controller.deshabilitar_habilitar_usuario)
router.post('/agregar-usuario', administrador_controller.agregar_usuario)
router.put('/actualizar-usuario/:_id_datosUsuario', administrador_controller.actualizar_usuario)
router.get('/listar-alumnos', administrador_controller.listar_alumnos)

module.exports = router;