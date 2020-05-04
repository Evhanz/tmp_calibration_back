"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_connections_1 = __importDefault(require("../databases/sequelize.connections"));
class Equipo extends sequelize_1.Model {
}
Equipo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    id_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_flota: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: "ts_equipos",
    timestamps: false,
    sequelize: sequelize_connections_1.default
});
exports.default = Equipo;
