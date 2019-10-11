const express = require('express');
const router = express.Router();
const contactos_controller = require('../controller/contactos.controller');

router.get('/listar-contactos-usuario/:id_usuario',contactos_controller.listar_contactos);
router.post('/registrar-contacto-nuevo',contactos_controller.añadir_nuevo_contacto);
router.get('/listar-datos-contacto/:id_contacto',contactos_controller.listar_datos_contacto);
router.put('/cambiar-estado-contacto',contactos_controller.cambiar_estado_contacto);

module.exports = router;