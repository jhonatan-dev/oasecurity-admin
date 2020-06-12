"use strict";

const path = require("path");
const multer = require("multer");

module.exports = {
    multerImagenConfig: {
        storage: multer.diskStorage({
            destination: "./public/uploads/rostros/",
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + path.extname(file.originalname));
            }
        }),
        limits: { fileSize: 1024 * 1024 * 3 }, //3 MB máx.
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            if (mimetype && extname) {
                return cb(null, true);
            }
            cb(new Error(`Solo se permite archivos de imagen jpeg, jpg, png`));
        }
    }
};
