"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", async (req, res) => {
  var usuarios = await adminController.listarUsuarios();
  res.render("index", {
    tituloVentana: "Inicio",
    scripts: ["inicio"],
    usuarios
  });
});

module.exports = router;
