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

usuarioService.listarUsuariosPorIdAplicacion = async (id_aplicacion) => {
  try {
    let response = await axios.get(
      `${apiOaSecurityUrl}/usuarios/aplicacion/${id_aplicacion}`,
      {
        headers: { appCode: appId },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    return response.data;
  } catch (err) {
    console.error(
      `Error en usuarioService.listarUsuariosPorIdAplicacion: ${err}`
    );
  }
};

usuarioService.registrarUsuario = async (usuario) => {
  try {
    const formulario = new FormData();
    const streamFotoRostro = intoStream(usuario.archivoFotoRostro.buffer);
    const streamAudioGrabacion = intoStream(
      usuario.archivoAudioGrabacion.buffer
    );
    formulario.append("dni", usuario.dni);
    formulario.append("nombres", usuario.nombres);
    formulario.append("apellidos", usuario.apellidos);
    formulario.append("email", usuario.email);
    formulario.append("password", usuario.password);
    formulario.append("id_aplicacion", usuario.id_aplicacion);
    formulario.append("foto_rostro", streamFotoRostro, {
      filename: `${new Date().toISOString()}.png`,
      contentType: usuario.archivoFotoRostro.mimetype,
      knownLength: usuario.archivoFotoRostro.buffer.length,
    });
    formulario.append("audio_grabacion", streamAudioGrabacion, {
      filename: `${new Date().toISOString()}.wav`,
      contentType: usuario.archivoAudioGrabacion.mimetype,
      knownLength: usuario.archivoAudioGrabacion.buffer.length,
    });
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

usuarioService.iniciarSesionFacial = async (idUsuario, faceId2File) => {
  try {
    const formulario = new FormData();
    const streamFaceId2File = intoStream(faceId2File.buffer);
    formulario.append("face_id_2", streamFaceId2File, {
      filename: `${new Date().toISOString()}.png`,
      contentType: faceId2File.mimetype,
      knownLength: faceId2File.buffer.length,
    });
    let response = await axios.post(
      `${apiOaSecurityUrl}/usuarios/login/facial`,
      formulario,
      {
        headers: {
          appCode: appId,
          idUsuario: idUsuario,
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

usuarioService.iniciarSesionVoz = async (profileId, audioFile) => {
  try {
    const formulario = new FormData();
    const streamAudioFile = intoStream(audioFile.buffer);
    formulario.append("audio_grabacion", streamAudioFile, {
      filename: `${new Date().toISOString()}.wav`,
      contentType: audioFile.mimetype,
      knownLength: audioFile.buffer.length,
    });
    let response = await axios.post(
      `${apiOaSecurityUrl}/usuarios/login/voz`,
      formulario,
      {
        headers: {
          appCode: appId,
          profileId: profileId,
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

usuarioService.entrenarSpeakerRecognition = async (idUsuario) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiOaSecurityUrl}/usuarios/entrenar`,
      headers: {
        appCode: appId,
        idUsuario,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.entrenarSpeakerRecognition: ${err}`);
  }
};

module.exports = usuarioService;
