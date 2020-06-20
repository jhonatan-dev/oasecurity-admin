"use strict";

const usuarioController = {};

const usuarioService = require("../services/usuarioService");

const jsonWebTokenConfig = require("../config/jsonWebTokenConfig");

const cookieOptions = {
  maxAge: new Date(Date.now() + 24 * 3600000), //expira en 24 horas
  httpOnly: true,
  //secure: true
};

usuarioController.iniciarSesionRenderizado = async (req, res) => {
  const { token_acceso } = req.cookies;
  if (token_acceso) {
    return res.redirect("/");
  }
  res.render("login", {
    tituloVentana: "Inicio de Sesión",
  });
};

usuarioController.listarUsuariosRenderizado = async (req, res) => {
  const { token_acceso } = req.cookies;
  if (!token_acceso) {
    res.clearCookie("autenticacion1");
    return res.redirect("/login");
  }
  let usuario = jsonWebTokenConfig.verify(token_acceso);
  let usuarios = await usuarioService.listarUsuarios();
  res.render("index", {
    tituloVentana: "Inicio",
    usuarios,
    usuario,
  });
};

usuarioController.registrarUsuarioRenderizado = async (req, res) => {
  const { token_acceso } = req.cookies;
  if (!token_acceso) {
    res.clearCookie("autenticacion1");
    return res.redirect("/login");
  }
  let usuario = jsonWebTokenConfig.verify(token_acceso);
  if (usuario.rol.nombre !== "Administrador") {
    return res.redirect("/");
  }
  res.render("register", {
    tituloVentana: "Registro",
    usuario,
    scripts: ["camera", "camera_controls", "face", "form_registro"],
    face_api: true,
    registro: true,
    urlAPI: String(require("../config/apisExternasConfig").apiOaSecurityUrl),
  });
};

usuarioController.iniciarSesion = async (req, res) => {
  try {
    let response = await usuarioService.iniciarSesion(
      req.body.email,
      req.body.password
    );
    res
      .status(200)
      .cookie("token_acceso", response.token, cookieOptions)
      .cookie("autenticacion1", "satisfactorio", cookieOptions)
      .redirect("/");
  } catch (err) {
    res.status(400).redirect("/login");
  }
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

usuarioController.cerrarSesion = async (req, res) => {
  res
    .clearCookie("token_acceso")
    .clearCookie("autenticacion1")
    .redirect("/login");
};

module.exports = usuarioController;
