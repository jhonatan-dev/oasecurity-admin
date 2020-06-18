"use strict";

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/login", async (req, res) => {
  usuarioController.iniciarSesionRenderizado(req, res);
});

router.get("/logout", async (req, res) => {
  usuarioController.cerrarSesion(req, res);
});

router.get("/", async (req, res) => {
  usuarioController.listarUsuariosRenderizado(req, res);
});

module.exports = router;
