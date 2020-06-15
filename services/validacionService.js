"use strict";

const validacionService = {};
const axios = require("axios");
const https = require("https");
const { usuarioModel } = require("../models");
const apiPeruDevConfig = require("../config/apiPeruDevConfig");

validacionService.existeEmail = async (email = "") => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: ["email"],
      where: {
        email,
      },
    });
    return usuario ? true : false;
  } catch (err) {
    console.error(`Error en validacionService.existeEmail: ${err}`);
    return false;
  }
};

validacionService.existeDNI = async (dni = "") => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: ["dni"],
      where: {
        dni,
      },
    });
    return usuario ? true : false;
  } catch (err) {
    console.error(`Error en validacionService.existeDNI: ${err}`);
    return false;
  }
};

validacionService.dniValido = async (dni = "") => {
  try {
    let resultadoPeticion = await axios.get(
      `${apiPeruDevConfig.urlDNI}/${dni}`,
      {
        headers: { Authorization: `Bearer ${apiPeruDevConfig.token}` },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    const data = resultadoPeticion.data;
    if (data.success) {
      return {
        nombres: `${data.data.nombres}`,
        apellidos: `${data.data.apellido_paterno} ${data.data.apellido_materno}`,
      };
    }
    return null;
  } catch (err) {
    console.error(`Error en validacionService.dniValido: ${err}`);
    return null;
  }
};

module.exports = validacionService;
