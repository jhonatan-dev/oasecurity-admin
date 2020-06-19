"use strict";

const usuarioController = {};

const usuarioService = require("../services/usuarioService");

usuarioController.iniciarSesionRenderizado = async (req, res) => {
  res.render("login", {
    tituloVentana: "Inicio de Sesión",
  });
};

usuarioController.cerrarSesion = async (req, res) => {
  res.redirect("/login");
};

usuarioController.listarUsuariosRenderizado = async (req, res) => {
  let usuarios = await usuarioService.listarUsuarios();
  res.render("index", {
    tituloVentana: "Inicio",
    usuarios,
  });
};

usuarioController.registrarUsuarioRenderizado = async (req, res) => {
  res.render("register", {
    tituloVentana: "Registro",
    scripts: ["camera", "camera_controls", "face", "form_registro"],
    face_api: true,
    registro: true,
    urlAPI: String(require("../config/apisExternasConfig").apiOaSecurityUrl),
  });
};

usuarioController.registrarUsuario = async (req, res) => {
  const { dni, nombres, apellidos, email, password } = req.body;
  const archivoFotoRostro = req.files["foto_rostro"][0];
  //const archivoAudioGrabacion = req.files["audio_grabacion"][0];
  try {
    await usuarioService.registrarUsuario({
      dni,
      nombres,
      apellidos,
      email,
      password,
      archivoFotoRostro,
      //archivoAudioGrabacion,
    });
    res.status(201).end();
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = usuarioController;
