"use strict";

const adminService = {};

const { usuarioModel, rolModel } = require("../models");

const intoStream = require("into-stream");
const bcryptLib = require("../libs/bcryptLib");
const {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
} = require("../config/azureStorageConfig");

adminService.registrarUsuario = async (usuario) => {
  let nuevoUsuario = {};
  const {
    dni,
    nombres,
    apellidos,
    email,
    password,
    archivoFotoRostro,
  } = usuario;
  const nombreArchivoFotoRostro = `${dni}_${new Date().getTime()}_${
    archivoFotoRostro.originalname
  }`;
  const streamFotoRostro = intoStream(archivoFotoRostro.buffer);
  const streamLengthFotoRostro = archivoFotoRostro.buffer.length;
  blobService.createBlockBlobFromStream(
    nombreContenedorFotosRostro,
    nombreArchivoFotoRostro,
    streamFotoRostro,
    streamLengthFotoRostro,
    async (error, result, response) => {
      if (!error) {
        try {
          nuevoUsuario = await usuarioModel.create({
            dni,
            nombres,
            apellidos,
            email,
            password: await bcryptLib.encryptPassword(password),
            url_foto_rostro: `${urlContenedorFotosRostro}/${result.name}`,
            url_audio_1: "empty",
            url_audio_2: "empty",
            url_audio_3: "empty",
            id_rol: 2, //Cliente
          });
        } catch (err) {
          console.error(err);
        }
        return nuevoUsuario;
      } else {
        console.error(error);
        return nuevoUsuario;
      }
    }
  );
};

adminService.listarUsuarios = async () => {
  let usuarios = [];
  try {
    usuarios = await usuarioModel.findAll({
      attributes: [
        "id",
        "dni",
        "nombres",
        "apellidos",
        "email",
        "url_foto_rostro",
        "url_audio_1",
        "url_audio_2",
        "url_audio_3",
      ],
      include: [
        {
          required: true,
          model: rolModel,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
  return usuarios;
};

module.exports = adminService;
