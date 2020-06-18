"use strict";

const usuarioService = {};
const axios = require("axios");
const https = require("https");

const { apiOaSecurityUrl } = require("../config/apisExternasConfig");

usuarioService.listarUsuarios = async () => {
  try {
    let response = await axios.get(`${apiOaSecurityUrl}/usuarios`, {
      //headers: { Authorization: `Bearer ${apiPeruDevConfig.token}` },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    return response.data;
  } catch (err) {
    console.error(`Error en usuarioService.listarUsuarios: ${err}`);
  }
};

module.exports = usuarioService;
