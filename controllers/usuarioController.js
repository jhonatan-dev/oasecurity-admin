"use strict";

const usuarioController = {};

const usuarioService = require("../services/usuarioService");

const jsonWebTokenConfig = require("../config/jsonWebTokenConfig");

const axios = require("axios");

const https = require("https");

const cookieOptions = {
  maxAge: 24 * 3600000, //expira en 24 horas
  httpOnly: true,
  secure: process.env.ENTORNO === "produccion" ? true : false,
  signed: true,
};

const {
  tokenLoginSuccess,
  tokenLoginFacialSuccess,
  tokenLoginVoiceSuccess,
} = require("../config/tokensAutenticacion");

usuarioController.iniciarSesionRenderizado = async (req, res) => {
  const {
    token,
    loginStatus,
    loginFacialStatus,
    loginVoiceStatus,
  } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    ((loginFacialStatus && loginFacialStatus === tokenLoginFacialSuccess) ||
      (loginVoiceStatus && loginVoiceStatus === tokenLoginVoiceSuccess))
  ) {
    return res.redirect("/");
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .clearCookie("loginVoiceStatus");
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
      .cookie("token", response.token, cookieOptions)
      .cookie("loginStatus", tokenLoginSuccess, cookieOptions)
      .status(200)
      .redirect("/login/facial");
  } catch (err) {
    res.status(400).redirect("/login");
  }
};

usuarioController.iniciarSesionFacialRenderizado = async (req, res) => {
  const { token, loginStatus, loginFacialStatus } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    loginFacialStatus &&
    loginFacialStatus === tokenLoginFacialSuccess
  ) {
    return res.redirect("/");
  } else if (token && loginStatus && loginStatus === tokenLoginSuccess) {
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
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .redirect("/login");
  }
};

usuarioController.iniciarSesionFacial = async (req, res) => {
  const { token, loginStatus } = req.signedCookies;
  if (token && loginStatus && loginStatus === tokenLoginSuccess) {
    const faceId2File = req.files["face_id_2"][0];
    let usuario = jsonWebTokenConfig.verify(token);
    let respuesta = await usuarioService.iniciarSesionFacial(
      usuario.id,
      faceId2File
    );
    if (respuesta.identico) {
      res
        .cookie("loginFacialStatus", tokenLoginFacialSuccess, cookieOptions)
        .status(200)
        .end();
    } else {
      res.status(401).end();
    }
  } else {
    res
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .redirect("/login");
  }
};

usuarioController.iniciarSesionVozRenderizado = async (req, res) => {
  const { token, loginStatus, loginVoiceStatus } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    loginVoiceStatus &&
    loginVoiceStatus === tokenLoginVoiceSuccess
  ) {
    return res.redirect("/");
  } else if (token && loginStatus && loginStatus === tokenLoginSuccess) {
    res.render("loginVoz", {
      scripts: ["login_voice_controls", "login_voice"],
      recorder_js: true,
      tituloVentana: "Login Voz",
    });
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

usuarioController.iniciarSesionVoz = async (req, res) => {
  const { token, loginStatus } = req.signedCookies;
  if (token && loginStatus && loginStatus === tokenLoginSuccess) {
    const audioFile = req.files["audio_data"][0];
    let usuario = jsonWebTokenConfig.verify(token);
    let respuesta = await usuarioService.iniciarSesionVoz(
      usuario.audio_profile_id,
      audioFile
    );
    if (respuesta.identico) {
      res
        .cookie("loginVoiceStatus", tokenLoginVoiceSuccess, cookieOptions)
        .status(200)
        .end();
    } else {
      res.status(401).end();
    }
  } else {
    res
      .clearCookie("loginStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

usuarioController.listarUsuariosRenderizado = async (req, res) => {
  const {
    token,
    loginStatus,
    loginFacialStatus,
    loginVoiceStatus,
  } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    ((loginFacialStatus && loginFacialStatus === tokenLoginFacialSuccess) ||
      (loginVoiceStatus && loginVoiceStatus === tokenLoginVoiceSuccess))
  ) {
    let usuario = jsonWebTokenConfig.verify(token);
    if (usuario.rol.nombre === "Cliente") {
      try {
        let tokenGenerado = jsonWebTokenConfig.signCustomWithoutExpiration(
          {
            dni: usuario.dni,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            password: usuario.password,
          },
          usuario.aplicacion.jwt_secret
        );
        await axios.get(`${usuario.aplicacion.url_login}`, {
          headers: { Authorization: `Bearer ${tokenGenerado}` },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        });
        return res.redirect(`${usuario.aplicacion.url_login}`);
      } catch (error) {
        return res.redirect("/logout");
      }
    }
    let usuarios = [];
    if (usuario.aplicacion !== null) {
      usuarios = await usuarioService.listarUsuariosPorIdAplicacion(
        usuario.aplicacion.id
      );
    } else {
      usuarios = await usuarioService.listarUsuarios();
    }
    usuarios.forEach((elemento) => {
      if (elemento.audio_profile_status === "Enrolled") {
        elemento.entrenado = true;
      } else {
        elemento.entrenado = false;
      }
    });
    usuario.verificado = true;
    res.render("index", {
      scripts: ["index_list"],
      tituloVentana: "Inicio",
      usuarios,
      usuario,
    });
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

usuarioController.registrarUsuarioRenderizado = async (req, res) => {
  const {
    token,
    loginStatus,
    loginFacialStatus,
    loginVoiceStatus,
  } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    ((loginFacialStatus && loginFacialStatus === tokenLoginFacialSuccess) ||
      (loginVoiceStatus && loginVoiceStatus === tokenLoginVoiceSuccess))
  ) {
    let usuario = jsonWebTokenConfig.verify(token);
    if (usuario.rol.nombre === "Administrador" && usuario.aplicacion !== null) {
      usuario.verificado = true;
      res.render("register", {
        tituloVentana: "Registro",
        usuario,
        scripts: [
          "camera",
          "register_camera_controls",
          "register_audio_controls",
          "register_audio",
          "register_faceapi",
          "register_form",
        ],
        face_api: true,
        recorder_js: true,
        insertarURLApi: true,
        urlAPI: String(
          require("../config/apisExternasConfig").apiOaSecurityUrl
        ),
      });
    } else {
      return res.redirect("/");
    }
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

usuarioController.registrarUsuario = async (req, res) => {
  const {
    token,
    loginStatus,
    loginFacialStatus,
    loginVoiceStatus,
  } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    ((loginFacialStatus && loginFacialStatus === tokenLoginFacialSuccess) ||
      (loginVoiceStatus && loginVoiceStatus === tokenLoginVoiceSuccess))
  ) {
    const { dni, nombres, apellidos, email, password } = req.body;
    const archivoFotoRostro = req.files["foto_rostro"][0];
    const archivoAudioGrabacion = req.files["audio_grabacion"][0];
    try {
      await usuarioService.registrarUsuario({
        dni,
        nombres,
        apellidos,
        email,
        password,
        archivoFotoRostro,
        archivoAudioGrabacion,
        id_aplicacion: jsonWebTokenConfig.verify(token).aplicacion.id,
      });
      res.status(201).end();
    } catch (err) {
      res.status(500).end();
    }
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

usuarioController.cerrarSesion = async (req, res) => {
  res
    .clearCookie("token")
    .clearCookie("loginStatus")
    .clearCookie("loginFacialStatus")
    .clearCookie("loginVoiceStatus")
    .redirect("/login");
};

usuarioController.entrenarSpeakerRecognition = async (req, res) => {
  const {
    token,
    loginStatus,
    loginFacialStatus,
    loginVoiceStatus,
  } = req.signedCookies;
  if (
    token &&
    loginStatus &&
    loginStatus === tokenLoginSuccess &&
    ((loginFacialStatus && loginFacialStatus === tokenLoginFacialSuccess) ||
      (loginVoiceStatus && loginVoiceStatus === tokenLoginVoiceSuccess))
  ) {
    await usuarioService.entrenarSpeakerRecognition(req.params.idUsuario);
    res.redirect("/");
  } else {
    res
      .clearCookie("token")
      .clearCookie("loginStatus")
      .clearCookie("loginFacialStatus")
      .clearCookie("loginVoiceStatus")
      .redirect("/login");
  }
};

module.exports = usuarioController;
