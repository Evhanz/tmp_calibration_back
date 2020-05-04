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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Equipo_1 = __importDefault(require("../entities/Equipo"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class UserController {
}
exports.default = UserController;
UserController.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ControlConnection.executeQuery(CONTROL_QUERY.GET_ALL_USERS, (err: any, result: any) => {
    //     if (err) {
    //         return res.status(500).json({ err })
    //     }
    //     return res.status(200).json({ result })
    // })
    try {
        let equips = yield Equipo_1.default.findAll();
        return res.status(200).json({ equipos: equips });
    }
    catch (err) {
        return res.status(500).json({ sucess: false });
    }
});
UserController.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }
    //Get user from database
    let user;
    try {
        user = yield UserRepository_1.default.findOne(username);
        if (user == null) {
            res.status(401).send();
        }
    }
    catch (error) {
        // console.log(error)
        res.status(401).send();
    }
    //Check if encrypted password match
    if (!UserRepository_1.default.checkIfUnencryptedPasswordIsValid(password, user.contrasena)) {
        res.status(401).send();
        return;
    }
    //Sing JWT, valid for 1 hour
    let token = jwt.sign({ userId: user.id, username: user.usuario }, config_1.default.jwtSecret, { expiresIn: "8h" });
    //Send the jwt in the response
    res.send({ accessToken: token });
});
