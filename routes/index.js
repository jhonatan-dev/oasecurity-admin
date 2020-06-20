"use strict";

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/login", async (req, res) => {
  await usuarioController.iniciarSesionRenderizado(req, res);
});

router.post("/login", async (req, res) => {
  await usuarioController.iniciarSesion(req, res);
});

router.get("/logout", async (req, res) => {
  await usuarioController.cerrarSesion(req, res);
});

router.get("/", async (req, res) => {
  await usuarioController.listarUsuariosRenderizado(req, res);
});

module.exports = router;
