"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const favicon = require("serve-favicon");
const dotenv = require("dotenv"); dotenv.config();
const sequelize = require("./config/sequelizeConfig");
const cookieParser = require("cookie-parser");

//Inicializaciones
const app = express();

//Configuraciones
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./config/handlebarsConfig")
    })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(favicon(path.join(__dirname, "/public/img", "logo.png")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./routes/index"));

app.use("/robots.txt", function (req, res) {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /js/\nDisallow: /css/\nDisallow: /img/");
});

//Carpeta Pública donde estarán los .css .js .png .jpg
app.use(express.static(path.join(__dirname, "public")));

//Iniciando el servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor ejecutándose por el puerto ${app.get("port")}`);
});