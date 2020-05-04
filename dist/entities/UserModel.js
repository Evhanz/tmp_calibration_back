"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_connections_1 = __importDefault(require("../databases/sequelize.connections"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    usuario: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    contrasena: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    idioma: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    schema: 'public',
    tableName: "tp_usuarios",
    timestamps: false,
    sequelize: sequelize_connections_1.default
});
exports.default = Equipo;
