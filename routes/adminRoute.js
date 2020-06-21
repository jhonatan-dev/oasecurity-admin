"use strict";

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const multer = require("multer");
const multerConfig = multer(
  require("../config/multerConfig").multerConfig
).fields([
  { name: "foto_rostro", maxCount: 1 },
  { name: "audio_grabacion", maxCount: 1 },
]);

router.get("/registro", async (req, res) => {
  await usuarioController.registrarUsuarioRenderizado(req, res);
});

router.post("/registro", multerConfig, async (req, res) => {
  await usuarioController.registrarUsuario(req, res);
});

module.exports = router;
