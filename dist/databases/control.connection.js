"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const environment_1 = require("../environment/environment");
class ControlConnection {
    constructor() {
        this.cnn = new pg_1.Client({
            user: environment_1.CONFIG.CONTROL_DB.USER_DB,
            host: environment_1.CONFIG.CONTROL_DB.HOST_DB,
            database: environment_1.CONFIG.CONTROL_DB.NAME_DB,
            password: environment_1.CONFIG.CONTROL_DB.PASS_DB,
            port: environment_1.CONFIG.CONTROL_DB.PORT_DB,
        });
        this.connect();
    }
    connect() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('DataBase Connected ...!');
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.cnn.query(query, (err, result) => {
            if (err) {
                console.log("Error query");
                console.log(err);
                return callback(err);
            }
            if (result.rowCount === 0) {
                callback('0 rows');
            }
            callback(null, result.rows);
        });
    }
    static asyncExecuteQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this._instance.cnn.query(query);
            return result.rows;
        });
    }
}
exports.default = ControlConnection;
