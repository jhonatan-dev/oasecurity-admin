"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const archivosFront = multer(
    require("../config/multerConfig").multerImagenConfig
).fields([
    { name: "foto_rostro", maxCount: 1 }
]);

router.post("/registro", async (req, res) => {
    archivosFront(req, res, async error => {
        console.log("files: ", req.files);
        console.log("body: ", req.body);
        res.redirect("/admin/registro");
    })
});

router.get("/registro", async (req, res) => {
    res.render("registro", {
        tituloVentana: "Registro",
        scripts: ["camera_controls", "face", "form_registro"],
        face_api: true
    });
});

module.exports = router;