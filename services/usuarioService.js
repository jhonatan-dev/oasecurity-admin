"use strict";

const usuarioService = {};
const intoStream = require("into-stream");
const bcryptLib = require("../libs/bcryptLib");
const usuarioRepository = require("../repository/usuarioRepository");
const azureSpeakerRecognitionVerificacionIndependienteConfig = require("../config/azureSpeakerRecognitionVerificacionIndependienteConfig");
const {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
} = require("../config/azureStorageConfig");

usuarioService.registrarUsuario = async (usuario) => {
  try {
    const nombreArchivoFotoRostro = `${usuario.dni}_${new Date().getTime()}_${
      usuario.archivoFotoRostro.originalname
    }`;
    const streamFotoRostro = intoStream(usuario.archivoFotoRostro.buffer);
    const streamLengthFotoRostro = usuario.archivoFotoRostro.buffer.length;
    let archivoFotoRostroGuardado = blobService.createBlockBlobFromStream(
      nombreContenedorFotosRostro,
      nombreArchivoFotoRostro,
      streamFotoRostro,
      streamLengthFotoRostro,
      async (error, result, response) => {
        if (error) {
          throw new Error(`Error en usuarioService.registrarUsuario: ${error}`);
        }
      }
    );
    const usuarioParaGuardar = {
      dni: usuario.dni,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password: await bcryptLib.encryptPassword(usuario.password),
      audio_profile_id: new Date().getTime()//await azureSpeakerRecognitionVerificacionIndependienteConfig.crearPerfil()
        .identificationProfileId,
      url_foto_rostro: `${urlContenedorFotosRostro}/${archivoFotoRostroGuardado.name}`,
    };
    let nuevoUsuario = await usuarioRepository.registrarUsuario(
      usuarioParaGuardar
    );
    return nuevoUsuario;
  } catch (err) {
    throw new Error(`Error en usuarioService.registrarUsuario: ${err}`);
  }
};

usuarioService.listarUsuarios = async () => {
  try {
    let usuarios = await usuarioRepository.listarUsuarios();
    return usuarios;
  } catch (err) {
    throw new Error(`Error en usuarioService.listarUsuarios: ${err}`);
  }
};

module.exports = usuarioService;
