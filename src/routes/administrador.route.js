const express= require('express');
const router= express.Router();
const auth = require('../middlewares/authentication');
const administradorController = require('../controller/administrador.controller');

router.post('/login',administradorController.SP_admin_login);
router.post('/registrar', auth.ensureAuth, administradorController.SP_admin_insert_update);
router.post('/editar', auth.ensureAuth, administradorController.SP_admin_update);
router.post('/cambiar-estado', auth.ensureAuth, administradorController.SP_admin_update_estado);
router.post('/cambiar-password', auth.ensureAuth, administradorController.SP_admin_update_password);
router.post('/reestablecer-password', administradorController.SP_admin_send_code_password);
router.post('/enviar-codigo', administradorController.SP_admin_reset_password);
router.get('/list/:id', auth.ensureAuth, administradorController.SP_admin_list);
router.get('/list',auth.ensureAuth, administradorController.SP_admin_list_datos_propios);
router.get('/tipos', auth.ensureAuth, administradorController.SP_admin_tipos_list);

module.exports= router;