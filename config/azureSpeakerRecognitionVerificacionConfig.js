"use strict";

const azureSpeakerRecognitionVerificacionConfig = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const urlEndpointVerificacion =
  process.env.AZURE_SPEAKER_RECOGNITION_API_VERIFICATION_TEXT_INDEPENDENT_URL;
const OcpApimSubscriptionKey = `${process.env.AZURE_SPEAKER_RECOGNITION_API_KEY}`;

const headers = {
  "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
};

/**
 * Obtiene los datos de un perfil de Verificación de Speaker Recognition ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil de Verificación de Speaker Recognition ya creado.
 * @return {Promise.<object>} Promesa con el objeto con los datos del perfil de Verificación de Speaker Recognition especificado.
 */
azureSpeakerRecognitionVerificacionConfig.obtenerPerfil = async (profileId) => {
  try {
    const response = await axios.get(
      `${urlEndpointVerificacion}/${profileId}`,
      {
        headers,
        httpsAgent,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.obtenerPerfil: ${err}`
    );
  }
};

/**
 * Obtiene los datos de todos los perfiles registrados de Verificación de Speaker Recognition.
 * @param {number} top El número de perfiles a devolver. El valor predeterminado es 100 y el máximo es 500.
 * @return {Promise.<Array.<object>} Promesa con el arreglo de objetos con los datos de todos los perfiles registrados de Verificación de Speaker Recognition.
 */
azureSpeakerRecognitionVerificacionConfig.obtenerTodosLosPerfiles = async (
  top = 100
) => {
  try {
    const response = await axios.get(`${urlEndpointVerificacion}`, {
      params: {
        $top: top,
      },
      headers,
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.obtenerTodosLosPerfiles: ${err}`
    );
  }
};

/**
 * Cree un nuevo perfil de Verificación de Speaker Recognition con un configuración regional especifica.
 * @param {string} locale Configuración regional solo se permite en-US (American English) por ahora.
 * @return {Promise.<object>} Promesa con el objeto con el profileId del nuevo perfil de Verificación de Speaker Recognition creado.
 */
azureSpeakerRecognitionVerificacionConfig.crearPerfil = async (
  locale = "en-US"
) => {
  try {
    const response = await axios.post(
      `${urlEndpointVerificacion}`,
      {
        locale,
      },
      {
        headers,
        httpsAgent,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.crearPerfil: ${err}`
    );
  }
};

/**
 * Borra todos los datos de un perfil de Verificación de Speaker Recognition ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil de Verificación de Speaker Recognition ya creado.
 * @return {Promise.<void>}
 */
azureSpeakerRecognitionVerificacionConfig.eliminarPerfil = async (
  profileId
) => {
  try {
    await axios.delete(`${urlEndpointVerificacion}/${profileId}`, {
      headers,
      httpsAgent,
    });
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.eliminarPerfil: ${err}`
    );
  }
};

/**
 * Crea una nueva inscripción para un perfil de Verificación de Speaker Recognition ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil de Verificación de Speaker Recognition ya creado.
 * @param {ReadStream} streamFile Archivo de audio .wav en formato ReadStream.
 * @param {number} streamLengthFile Longitud de bytes del archivo de audio .wav en formato ReadStream.
 * @param {boolean} ignoreMinLength Si se le asigna un valor de true, se creará una impresión de voz inmediatamente para este perfil, independientemente de la cantidad de voz que se suministre o almacene. El valor por defecto de este parámetro es false.
 * @return {Promise.<void>}
 */
azureSpeakerRecognitionVerificacionConfig.crearInscripcionEnPerfil = async (
  profileId,
  streamFile,
  streamLengthFile,
  ignoreMinLength = false
) => {
  try {
    const response = await axios({
      method : "post",
      url: `${urlEndpointVerificacion}/${profileId}/enrollments`,
      data : streamFile,
      params: {
        ignoreMinLength,
      },
      headers: {
        "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
        "Content-Type": "audio/wav",
        "Content-Length": streamLengthFile,
      },
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.crearInscripcionEnPerfil: ${err}`
    );
  }
};

/**
 * Elimina todas las inscripciones asociadas a un perfil de Verificación de Speaker Recognition ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil de Verificación de Speaker Recognition ya creado.
 * @return {Promise.<void>}
 */
azureSpeakerRecognitionVerificacionConfig.resetearPerfil = async (
  profileId
) => {
  try {
    await axios({
      url: `${urlEndpointVerificacion}/${profileId}/reset`,
      method: "post",
      headers,
      httpsAgent,
    });
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionConfig.resetearPerfil: ${err}`
    );
  }
};

module.exports = azureSpeakerRecognitionVerificacionConfig;
