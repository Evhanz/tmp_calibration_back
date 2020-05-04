"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment/environment");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(environment_1.CONFIG.CONTROL_DB.NAME_DB, environment_1.CONFIG.CONTROL_DB.USER_DB, environment_1.CONFIG.CONTROL_DB.PASS_DB, {
    host: environment_1.CONFIG.CONTROL_DB.HOST_DB,
    dialect: 'postgres'
});
exports.default = sequelize;
