"use strict";

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/", async (req, res) => {
  var usuarios = await usuarioController.listarUsuarios();
  res.render("index", {
    tituloVentana: "Inicio",
    scripts: ["inicio"],
    usuarios,
  });
});

module.exports = router;
