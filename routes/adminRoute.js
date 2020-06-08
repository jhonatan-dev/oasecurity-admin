"use strict";

const express = require("express");
const router = express.Router();

router.post("/registro", async (req, res) => {
    console.log("body: ", req.body);
    res.redirect("/admin/registro");
});

router.get("/registro", async (req, res) => {
    res.render("registro");
});

module.exports = router;