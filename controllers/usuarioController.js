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
  });
};

module.exports = usuarioController;
