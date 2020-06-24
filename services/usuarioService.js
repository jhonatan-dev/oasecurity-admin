"use strict";

const usuarioService = {};
const axios = require("axios");
const https = require("https");
const intoStream = require("into-stream");
const FormData = require("form-data");
const { apiOaSecurityUrl } = require("../config/apisExternasConfig");
const appId = "OA_SECURITY_ADMIN";

usuarioService.listarUsuarios = async () => {
  try {
    let response = await axios.get(`${apiOaSecurityUrl}/usuarios`, {
      headers: { appCode: appId },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.listarUsuarios: ${err}`);
  }
};

usuarioService.registrarUsuario = async (usuario) => {
  try {
    const formulario = new FormData();
    const streamFotoRostro = intoStream(usuario.archivoFotoRostro.buffer);
    //const streamAudioGrabacion = intoStream(usuario.archivoAudioGrabacion.buffer);
    formulario.append("dni", usuario.dni);
    formulario.append("nombres", usuario.nombres);
    formulario.append("apellidos", usuario.apellidos);
    formulario.append("email", usuario.email);
    formulario.append("password", usuario.password);
    formulario.append("foto_rostro", streamFotoRostro, {
      filename: "foto_rostro.png",
      contentType: usuario.archivoFotoRostro.mimetype,
      knownLength: usuario.archivoFotoRostro.buffer.length,
    });
    /*
    formulario.append("audio_grabacion", streamAudioGrabacion, {
      filename: "audio_grabacion.wav",
      contentType: usuario.archivoAudioGrabacion.mimetype,
      knownLength: usuario.archivoAudioGrabacion.buffer.length,
    });
    */
    let response = await axios.post(
      `${apiOaSecurityUrl}/usuarios`,
      formulario,
      {
        headers: {
          appCode: appId,
          ...formulario.getHeaders(),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.registrarUsuario: ${err}`);
  }
};

usuarioService.iniciarSesion = async (email, password) => {
  try {
    let response = await axios.post(
      `${apiOaSecurityUrl}/usuarios/login`,
      {
        email,
        password,
      },
      {
        headers: { appCode: appId },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.iniciarSesion: ${err}`);
  }
};

usuarioService.iniciarSesionFacial = async (faceId1, faceId2File) => {
  try {
    const formulario = new FormData();
    const streamFaceId2File = intoStream(faceId2File.buffer);
    formulario.append("face_id_2", streamFaceId2File, {
      filename: "face_id_2.png",
      contentType: faceId2File.mimetype,
      knownLength: faceId2File.buffer.length,
    });
    let response = await axios.post(
      `${apiOaSecurityUrl}/usuarios/login/facial`,
      formulario,
      {
        headers: {
          appCode: appId,
          faceId1: faceId1,
          ...formulario.getHeaders(),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.iniciarSesionFacial: ${err}`);
  }
};

module.exports = usuarioService;
