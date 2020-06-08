"use strict";

const validacionService = {}
const axios = require("axios");
const https = require("https");
const {
    usuarioModel
} = require("../models");
const apisPeruConfig = require("../config/apisperuConfig");

validacionService.existeEmail = async (email = "") => {
    try {
        let usuario = await usuarioModel.findOne({
            attributes: ["email"],
            where: {
                email
            }
        });
        return usuario ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

validacionService.existeDNI = async (dni = "") => {
    try {
        let usuario = await usuarioModel.findOne({
            attributes: ["dni"],
            where: {
                dni
            }
        });
        return usuario ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

validacionService.dniValido = async (dni = "") => {
    try {
        let resultadoPeticion = await axios.get(
            `${apisPeruConfig.urlDNI}/${dni}`,
            {
                params: {
                    token: apisPeruConfig.token
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            }
        );
        return String(resultadoPeticion.data.nombres).trim().length > 0 ? {
            nombres: resultadoPeticion.data.nombres,
            apellidos: `${resultadoPeticion.data.apellidoPaterno} ${resultadoPeticion.data.apellidoMaterno}`
        } : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = validacionService;