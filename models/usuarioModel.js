const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class Usuario extends Model { }
module.exports = sequelize => {
    Usuario.init(
        {
            // atributos
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            dni: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nombres: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellidos: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            url_foto_rostro: {
                type: Sequelize.STRING,
                allowNull: false
            },
            url_audio_1: {
                type: Sequelize.STRING,
                allowNull: false
            },
            url_audio_2: {
                type: Sequelize.STRING,
                allowNull: false
            },
            url_audio_3: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_rol: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT"
            }
        },
        {
            // opciones
            sequelize,
            modelName: "usuario",
            tableName: "usuarios",
            name: {
                singular: "usuario",
                plural: "usuarios"
            }
        }
    );
    return Usuario;
};