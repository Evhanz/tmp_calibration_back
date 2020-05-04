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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const Decrypt_1 = __importDefault(require("../services/Decrypt"));
class UserRepository {
}
UserRepository.findOne = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield User_1.default.findOne({
        where: {
            usuario: username
        }
    });
    console.log(response);
    return response;
});
UserRepository.checkIfUnencryptedPasswordIsValid = (passInput, passUser) => {
    let decrypt = new Decrypt_1.default();
    if (decrypt.asciinom(decrypt.decode(passUser)) == passInput) {
        return true;
    }
    return false;
};
;
exports.default = UserRepository;
