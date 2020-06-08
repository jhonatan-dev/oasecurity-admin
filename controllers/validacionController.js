"use strict";

const validacionController = {}
const validacionService = require("../services/validacionService")

validacionController.existeEmail = async (email = "") => {
    return await validacionService.existeEmail(email);
}

validacionController.existeDNI = async (dni = "") => {
    return await validacionService.existeDNI(dni);
}

validacionController.dniValido = async (dni = "") => {
    return await validacionService.dniValido(dni);
}

module.exports = validacionController