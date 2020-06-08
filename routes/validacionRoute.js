"use strict";

const express = require("express");
const router = express.Router();

const validacionController = require("../controllers/validacionController");

router.get("/interna", async (req, res) => {
    if (req.query.email) {
        let emailRegistrado = await validacionController.existeEmail(req.query.email);
        if (emailRegistrado) {
            res.json(false).status(400);
        } else {
            res.json(true).status(200);
        }
    } else if (req.query.dni) {
        let dniRegistrado = await validacionController.existeDNI(req.query.dni);
        if (dniRegistrado) {
            res.json(false).status(400);
        } else {
            res.json(true).status(200);
        }
    } else {
        res.json(false).status(400);
    }
});

router.get("/externa", async (req, res) => {
    if (req.query.dni) {
        let informacionValida = await validacionController.dniValido(req.query.dni);
        if (informacionValida) {
            res.json({
                valido: true,
                informacion: informacionValida
            }).status(200);
        } else {
            res.json(false).status(400);
        }
    } else {
        res.json(false).status(400);
    }
});

module.exports = router;