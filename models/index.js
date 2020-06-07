"use strict";

const sequelize = require("../config/sequelizeConfig");

const rolModel = require("./rolModel")(sequelize);
const usuarioModel = require("./usuarioModel")(sequelize);

//Estableciendo relaciones entre tablas
usuarioModel.belongsTo(rolModel, { foreignKey: "id_rol", sourceKey: "id" });
rolModel.hasMany(usuarioModel, { foreignKey: "id_rol", sourceKey: "id" });

module.exports = {
    rolModel,
    usuarioModel
};