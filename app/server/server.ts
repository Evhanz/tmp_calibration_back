import express from 'express';
import { CONFIG } from '../environment/environment';
import socketIO from 'socket.io';
import http from 'http';


export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    constructor() {
        this.app = express();
        this.port = parseInt(CONFIG.SERVER.SERVER_PORT+'');
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer)
        // this.initCrons();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: any) {

        this.httpServer.listen(this.port, callback);
    }

    
    


}