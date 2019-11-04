const express = require('express')
const router = express.Router()
const administrador_controller = require('../controller/administrador.controller')

router.post('/deshabilitar-usuario/:id', administrador_controller.deshabilitar_usuario)
router.post('/agregar-usuario', administrador_controller.agregar_usuario)
router.put('/actualizar-usuario', administrador_controller.actualizar_usuario)

module.exports = router;