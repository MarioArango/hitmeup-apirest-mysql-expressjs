const express = require("express");
const router = express.Router();
const like_controller = require("../controller/like.controller")

router.post("/generar-like", like_controller.cambiar_estado_like);

module.exports = router;

