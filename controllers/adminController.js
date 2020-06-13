"use strict";

const adminController = {};
const adminService = require("../services/adminService")

adminController.registrarUsuario = async (usuario) =>{
    return await adminService.registrarUsuario(usuario);
}

adminController.listarUsuarios = async () =>{
    return await adminService.listarUsuarios();
}

module.exports = adminController;
