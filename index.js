"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const hbs = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const dotenv = require("dotenv");
dotenv.config();
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
    helpers: require("./config/handlebarsConfig"),
    handlebars: allowInsecurePrototypeAccess(hbs),
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("oa_security"));

app.use(require("./routes/index"));
app.use("/admin", require("./routes/adminRoute"));

//Carpeta Pública donde estarán los .css .js .png .jpg
app.use(express.static(path.join(__dirname, "public")));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutándose por el puerto ${app.get("port")}`);
});
