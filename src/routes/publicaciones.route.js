const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const publicaciones_controller = require('../controller/publicaciones.controller');

router.get('/listar-publicaciones',publicaciones_controller.listar_todas_publicaciones);

module.exports = router;