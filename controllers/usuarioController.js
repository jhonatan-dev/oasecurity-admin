"use strict";

const usuarioController = {};

const usuarioService = require("../services/usuarioService");

const jsonWebTokenConfig = require("../config/jsonWebTokenConfig");

const cookieOptions = {
  maxAge: 24 * 3600000, //expira en 24 horas
  httpOnly: true,
  secure: true,
};

const md5Config = require("../config/md5Config");

const {
  tokenLoginSuccess,
  tokenLoginNotSuccess,
  tokenLoginFacialSuccess,
  tokenLoginFacialNotSuccess,
  tokenLoginVoiceSuccess,
  tokenLoginVoiceNotSuccess,
} = require("../config/tokensAutenticacion");

usuarioController.iniciarSesionRenderizado = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    return res.redirect("/");
  }
  res.render("login", {
    tituloVentana: "Login",
    scripts: ["login_form"],
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
      .cookie("token", response.token, cookieOptions)
      .cookie("loginStatus", tokenLoginSuccess, cookieOptions)
      .redirect("/");
  } catch (err) {
    res.status(400).redirect("/login");
  }
};

usuarioController.iniciarSesionFacialRenderizado = async (req, res) => {
  const { token, loginStatus } = req.cookies;
  if (token && loginStatus === tokenLoginSuccess) {
    return res.redirect("/");
  }
  res.render("loginFacial", {
    scripts: [
      "camera",
      "login_camera_controls",
      "login_faceapi",
      "login_facial",
    ],
    face_api: true,
    tituloVentana: "Login Facial",
  });
};

usuarioController.iniciarSesionFacial = async (req, res) => {
  const archivoFotoRostro = req.files["foto_rostro"][0];
  console.log("iniciarSesionFacial, archivoFotoRostro: ", archivoFotoRostro);
  res.status(400).redirect("/login");
};

usuarioController.listarUsuariosRenderizado = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.clearCookie("loginStatus");
    return res.redirect("/login");
  }
  let usuario = jsonWebTokenConfig.verify(token);
  let usuarios = await usuarioService.listarUsuarios();
  res.render("index", {
    tituloVentana: "Inicio",
    usuarios,
    usuario,
  });
};

usuarioController.registrarUsuarioRenderizado = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.clearCookie("loginStatus");
    return res.redirect("/login");
  }
  let usuario = jsonWebTokenConfig.verify(token);
  if (usuario.rol.nombre !== "Administrador") {
    return res.redirect("/");
  }
  res.render("register", {
    tituloVentana: "Registro",
    usuario: null,
    scripts: [
      "camera",
      "register_camera_controls",
      "register_faceapi",
      "register_form",
    ],
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

usuarioController.cerrarSesion = async (req, res) => {
  res
    .clearCookie("token")
    .clearCookie("loginStatus")
    .redirect("/login");
};

/*
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
    await require("../config/azureSpeakerRecognitionVerificacionIndependienteConfig").verificarPerfil(
      "1a3b0033-ceae-4582-983d-3f86a42d3eb5",
      streamAudioGrabacion,
      streamLengthAudioGrabacion,
      false
    )
  );
  res.redirect("/admin/obtener");
});
*/

module.exports = usuarioController;
