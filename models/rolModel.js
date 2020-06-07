const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class Rol extends Model { }
module.exports = sequelize => {
  Rol.init(
    {
      // atributos
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      // opciones
      sequelize,
      modelName: "rol",
      tableName: "roles",
      name: {
        singular: "rol",
        plural: "roles"
      }
    }
  );
  return Rol;
};