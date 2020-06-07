"use strict";

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dialect: "postgres",
    timezone: "-05:00",
    pool: {
        max: 4,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true,
        freezeTableName: false,
        timestamps: false,
        engine: "InnoDB",
        charset: "utf8mb4",
        collate: "utf8mb4_spanish_ci"
    },
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("La BD está conectada.");
    })
    .catch(err => {
        if (err.parent.code == "ER_ACCESS_DENIED_ERROR") {
            console.error("Acceso denegado al usuario de la BD.");
        } else if (err.parent.code == "PROTOCOL_CONNECTION_LOST") {
            console.error("La conexión con la BD fue cerrada.");
        } else if (err.parent.code == "ER_CON_COUNT_ERROR") {
            console.error("La BD tiene muchas conexiones.");
        } else if (err.parent.code == "ECONNREFUSED") {
            console.error("La conexión con la BD fue rechazada.");
        } else {
            console.error("Error para conectarse a la BD:", err);
        }
    });

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("BD cargada correctamente.");
    })
    .catch(err => {
        console.error("No se pudo cargar la BD.", err);
    });

module.exports = sequelize;