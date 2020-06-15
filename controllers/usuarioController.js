"use strict";

const usuarioController = {};
const usuarioService = require("../services/usuarioService")

usuarioController.registrarUsuario = async (usuario) =>{
    return await usuarioService.registrarUsuario(usuario);
}

usuarioController.listarUsuarios = async () =>{
    return await usuarioService.listarUsuarios();
}

module.exports = usuarioController;
