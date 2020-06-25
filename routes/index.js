"use strict";

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const multer = require("multer");
const multerConfig = multer(
  require("../config/multerConfig").multerConfig
).fields([
  { name: "face_id_2", maxCount: 1 },
  { name: "audio_grabacion", maxCount: 1 },
]);

router.get("/login", async (req, res) => {
  await usuarioController.iniciarSesionRenderizado(req, res);
});

router.post("/login", async (req, res) => {
  await usuarioController.iniciarSesion(req, res);
});

router.get("/login/facial", async (req, res) => {
  await usuarioController.iniciarSesionFacialRenderizado(req, res);
});

router.post("/login/facial", multerConfig, async (req, res) => {
  await usuarioController.iniciarSesionFacial(req, res);
});

router.get("/logout", async (req, res) => {
  await usuarioController.cerrarSesion(req, res);
});

router.get("/", async (req, res) => {
  await usuarioController.listarUsuariosRenderizado(req, res);
});

module.exports = router;
