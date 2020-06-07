"use strict";

const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const {
  usuarioModel,
  rolModel
} = require("../models");


router.get("/", async (req, res) => {
  const dato = await rolModel.findAll();
  res.send(dato);
});

module.exports = router;