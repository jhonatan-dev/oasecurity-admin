"use strict";

const adminService = {};

const { usuarioModel, rolModel } = require("../models");

const bcryptLib = require("../libs/bcryptLib");

adminService.registrarUsuario = async (usuario) => {
  const { dni, nombres, apellidos, email, password, foto_rostro } = usuario;
  let nuevoUsuario = {};
  try {
    nuevoUsuario = await usuarioModel.create({
      dni,
      nombres,
      apellidos,
      email,
      password: await bcryptLib.encryptPassword(password),
      url_foto_rostro: foto_rostro,
      url_audio_1: "empty",
      url_audio_2: "empty",
      url_audio_3: "empty",
      id_rol: 2, //Cliente
    });
  } catch (error) {
    console.error(error);
  }
  return nuevoUsuario;
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
