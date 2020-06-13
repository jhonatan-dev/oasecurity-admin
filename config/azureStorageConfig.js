"use strict";

const azure = require("azure-storage");
const blobService = azure.createBlobService();

const nombreContenedorFotosRostro = "rostros";
const urlContenedorFotosRostro = `${process.env.AZURE_STORAGE_BLOB_URL}/${nombreContenedorFotosRostro}`;
const nombreContenedorGrabaciones = "grabaciones";
const urlContenedorGrabaciones = `${process.env.AZURE_STORAGE_BLOB_URL}/${nombreContenedorGrabaciones}`;

module.exports = {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
  urlContenedorGrabaciones,
};
