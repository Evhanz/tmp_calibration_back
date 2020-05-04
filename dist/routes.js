"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const routes = express_1.Router();
//--------------------------------------------------------//
// ╔═╗╔═╗╔╦╗
// ║ ╦║╣  ║
// ╚═╝╚═╝ ╩
//--------------------------------------------------------//
routes.get('/api/v1/users', user_controller_1.default.getAllUsers);
//--------------------------------------------------------//
// ╔═╗╔═╗╔═╗╔╦╗
// ╠═╝║ ║╚═╗ ║
// ╩  ╚═╝╚═╝ ╩
//--------------------------------------------------------//
routes.post('/auth/login', user_controller_1.default.logIn);
//--------------------------------------------------------//
// ╔═╗╦ ╦╔╦╗
// ╠═╝║ ║ ║
// ╩  ╚═╝ ╩
//--------------------------------------------------------//
//--------------------------------------------------------//
// ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
//  ║║║╣ ║  ║╣  ║ ║╣
// ╚╩╝╚═╝╚═╝╚═╝ ╩ ╚═╝
//--------------------------------------------------------//
//--------------------------------------------------------//
exports.default = routes;
