"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const usuarioController = require("../controllers/usuarioController");
const multerConfig = multer(
  require("../config/multerConfig").multerConfig
).fields([
  { name: "foto_rostro", maxCount: 1 },
  { name: "audio_grabacion", maxCount: 1 },
]);

router.post("/registro", multerConfig, async (req, res) => {
  const { dni, nombres, apellidos, email, password } = req.body;
  const archivoFotoRostro = req.files["foto_rostro"][0];
  let nuevoUsuario = await usuarioController.registrarUsuario({
    dni,
    nombres,
    apellidos,
    email,
    password,
    archivoFotoRostro,
  });
  res.json(nuevoUsuario).status(200);
});

router.get("/registro", async (req, res) => {
  res.render("registro", {
    tituloVentana: "Registro",
    scripts: ["camera", "camera_controls", "face", "form_registro"],
    face_api: true,
  });
});

router.get("/obtener", async (req, res) => {
  res.render("obtener", { title: "Obtener" });
});

const intoStream = require("into-stream");
router.post("/obtener", multerConfig, async (req, res) => {
  const archivoAudioGrabacion = req.files["audio_grabacion"][0];
  const streamAudioGrabacion = intoStream(archivoAudioGrabacion.buffer);
  const streamLengthAudioGrabacion = archivoAudioGrabacion.buffer.length;
  console.log(
    "resultado: ",
    await require("../config/azureSpeakerRecognitionVerificacionConfig").crearInscripcionEnPerfil(
      "1a3b0033-ceae-4582-983d-3f86a42d3eb5",
      streamAudioGrabacion,
      streamLengthAudioGrabacion,
      false
    )
  );
  res.redirect("/admin/obtener");
});

module.exports = router;
