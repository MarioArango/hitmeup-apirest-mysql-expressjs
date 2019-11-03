const express = require('exprees')
const router = express.Router()
const administrador_controller = require('../controller/administrador.controller')

router.post('/deshabilitar-usuario', administrador_controller.deshabilitar_usuario)
router.post('/agregar-usuario', administrador_controller.agregar_usuario)
router.post('/actualizar-usuario', administrador_controller.actualizar_usuario)

module.exports = router;