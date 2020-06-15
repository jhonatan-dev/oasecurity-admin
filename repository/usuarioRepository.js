"use strict";

const usuarioRepository = {};

const { usuarioModel, rolModel } = require("../models");

usuarioRepository.registrarUsuario = async (usuario) => {
  try {
    const {
      dni,
      nombres,
      apellidos,
      email,
      password,
      audio_profile_id,
      url_foto_rostro,
    } = usuario;
    let nuevoUsuario = await usuarioModel.create({
      dni,
      nombres,
      apellidos,
      email,
      password,
      audio_profile_id,
      url_foto_rostro,
      url_audio_1: "empty",
      url_audio_2: "empty",
      url_audio_3: "empty",
      id_rol: 2, //Cliente
    });
    return nuevoUsuario;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.registrarUsuario: ${err}`);
  }
};

usuarioRepository.listarUsuarios = async () => {
  try {
    let usuarios = await usuarioModel.findAll({
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
    return usuarios;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.listarUsuarios: ${err}`);
  }
};

module.exports = usuarioRepository;
