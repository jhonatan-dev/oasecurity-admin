"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");
const archivosFront = multer(
  require("../config/multerConfig").multerImagenConfig
).fields([{ name: "foto_rostro", maxCount: 1 }]);

router.post("/registro", async (req, res) => {
  archivosFront(req, res, async (error) => {
    console.log("files: ", req.files);
    console.log("body: ", req.body);
    const { dni, nombres, apellidos, email, password } = req.body;
    const { filename } = req.files["foto_rostro"][0];
    let usuario = await adminController.registrarUsuario({
      dni,
      nombres,
      apellidos,
      email,
      password,
      foto_rostro: filename,
    });
    res.json(usuario).status(200);
  });
});

router.get("/registro", async (req, res) => {
  res.render("registro", {
    tituloVentana: "Registro",
    scripts: ["camera", "camera_controls", "face", "form_registro"],
    face_api: true,
  });
});

module.exports = router;
