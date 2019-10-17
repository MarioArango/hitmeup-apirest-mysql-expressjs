const express = require('express');
const router = express.Router();
const contactos_controller = require('../controller/contactos.controller');

router.get('/listar-contactos-usuario/:id_usuario',contactos_controller.listar_contactos);
router.post('/agregar-contacto-estado',contactos_controller.añadir_contacto_estado);
router.get('/listar-datos-contacto/:id_contacto',contactos_controller.listar_datos_contacto);

module.exports = router;