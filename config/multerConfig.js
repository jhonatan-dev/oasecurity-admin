"use strict";

const path = require("path");
const multer = require("multer");

module.exports = {
    multerConfig: {
        storage: multer.memoryStorage(),
        limits: { fileSize: 1024 * 1024 * 3 }, //3 MB máx.
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png|wav/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            if (mimetype && extname) {
                return cb(null, true);
            }
            cb(new Error(`Solo se permite archivos con extensión jpeg, jpg, png, wav`));
        }
    }
};
