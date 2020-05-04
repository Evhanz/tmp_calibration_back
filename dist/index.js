"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server_1 = __importDefault(require("./server/server"));
const routes_1 = __importDefault(require("./routes"));
const sequelize_connections_1 = __importDefault(require("./databases/sequelize.connections"));
const server = server_1.default.instance;
// const connection = ControlConnection.instance;
// const connection =
//---------CONFIGURE BODY PARSE---------//
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//---------CONFIGURE BODY PARSE---------//
//---------CONFIGURE CORS---------//
server.app.use(cors_1.default({ origin: true, credentials: true }));
//---------CONFIGURE CORS---------//
//---------CONFIGURE ROUTES---------//
server.app.use('/', routes_1.default);
//---------CONFIGURE ROUTES---------//
sequelize_connections_1.default.authenticate()
    .then(() => {
    console.log('Database connected!');
    server.start(() => {
        console.log(`server corriendo en el puerto ${server.port}`);
    });
}).catch((err) => {
    console.log(err);
});
