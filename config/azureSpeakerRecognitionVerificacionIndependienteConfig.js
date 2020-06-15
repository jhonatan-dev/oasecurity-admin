"use strict";

const azureSpeakerRecognitionVerificacionIndependienteConfig = {};

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
 * Obtiene los datos de un perfil ya creado.
 * @param {string} profileId Valor de la propiedad de 'profileId' de un perfil ya creado.
 * @return {Promise.<object>} Promesa que retorna un objeto con los datos del perfil especificado.
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.obtenerPerfil = async (
  profileId
) => {
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
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.obtenerPerfil: ${err}`
    );
  }
};

/**
 * Obtiene los datos de todos los perfiles registrados.
 * @param {number} top Representa el número de perfiles a devolver. El valor predeterminado es 100 y el máximo es 500.
 * @return {Promise.<Array.<object>} Promesa que retorna un arreglo de objetos con los datos de todos los perfiles registrados.
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.obtenerListaPerfiles = async (
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
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.obtenerListaPerfiles: ${err}`
    );
  }
};

/**
 * Cree un nuevo perfil con una configuración regional especifica.
 * @param {string} locale Representa el tipo de configuración regional, en Verificación solo se permite en-US (American English), por ahora.
 * @return {Promise.<object>} Promesa que retorna un objeto con el 'profileId' del nuevo perfil creado.
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.crearPerfil = async (
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
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.crearPerfil: ${err}`
    );
  }
};

/**
 * Borra todos los datos de un perfil ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil ya creado.
 * @return {Promise.<void>}
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.eliminarPerfil = async (
  profileId
) => {
  try {
    await axios.delete(`${urlEndpointVerificacion}/${profileId}`, {
      headers,
      httpsAgent,
    });
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.eliminarPerfil: ${err}`
    );
  }
};

/**
 * Crea una nueva inscripción para un perfil ya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil ya creado.
 * @param {object} streamFile Archivo de audio .wav en forma de un Readable Stream.
 * @param {number} streamLengthFile Longitud de bytes del archivo de audio .wav en forma de un Readable Stream.
 * @param {boolean} ignoreMinLength Si se le asigna un valor de true, se creará una impresión de voz inmediatamente para este perfil, independientemente de la cantidad de voz que se suministre o almacene. El valor por defecto de este parámetro es false.
 * @return {Promise.<object>} Promesa que retorna un objeto que muestra el estado de la nueva registración para el perfil especificado.
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.crearInscripcion = async (
  profileId,
  streamFile,
  streamLengthFile,
  ignoreMinLength = false
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${urlEndpointVerificacion}/${profileId}/enrollments`,
      data: streamFile,
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
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.crearInscripcion: ${err}`
    );
  }
};

/**
 * Verifica un perfil ya creado con la entrada de un nuevo archivo .wav
 * @param {string} profileId Valor de la propiedad de profileId de un perfil ya creado.
 * @param {object} streamNewFile Archivo nuevo de audio .wav en forma de un Readable Stream.
 * @param {number} streamLengthNewFile Longitud de bytes del archivo nuevo de audio .wav en forma de un Readable Stream.
 * @param {boolean} ignoreMinLength Si se le asigna un valor de true, se creará una impresión de voz inmediatamente para este perfil, independientemente de la cantidad de voz que se suministre o almacene. El valor por defecto de este parámetro es false.
 * @return {Promise.<object>} Promesa que retorna objeto que muestra el estado de la verificación del perfil especificado.
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.verificarPerfil = async (
  profileId,
  streamNewFile,
  streamLengthNewFile,
  ignoreMinLength = false
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${urlEndpointVerificacion}/${profileId}/verify`,
      data: streamNewFile,
      params: {
        ignoreMinLength,
      },
      headers: {
        "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
        "Content-Type": "audio/wav",
        "Content-Length": streamLengthNewFile,
      },
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.verificarPerfil: ${err}`
    );
  }
};

/**
 * Elimina todas las inscripciones asociadas a un perfilya creado.
 * @param {string} profileId Valor de la propiedad de profileId de un perfil ya creado.
 * @return {Promise.<void>}
 */
azureSpeakerRecognitionVerificacionIndependienteConfig.restablecerPerfil = async (
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
      `Error en azureSpeakerRecognitionVerificacionIndependienteConfig.restablecerPerfil: ${err}`
    );
  }
};

module.exports = azureSpeakerRecognitionVerificacionIndependienteConfig;
