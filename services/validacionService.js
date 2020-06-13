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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = validacionService;
