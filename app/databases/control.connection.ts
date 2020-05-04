import { Client } from 'pg'
import { CONFIG } from '../environment/environment';


export default class ControlConnection {

    private static _instance: ControlConnection;
    cnn: Client;

    constructor() {
        
        this.cnn = new Client({
            user: CONFIG.CONTROL_DB.USER_DB,
            host: CONFIG.CONTROL_DB.HOST_DB,
            database: CONFIG.CONTROL_DB.NAME_DB,
            password: CONFIG.CONTROL_DB.PASS_DB,
            port: CONFIG.CONTROL_DB.PORT_DB,

        });
        this.connect();

    }

    private connect() {
        this.cnn.connect((err: any) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('DataBase Connected ...!');

        })
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static executeQuery(query: string, callback: any) {

        this.instance.cnn.query(query, (err, result) => {
            if (err) {
                console.log("Error query");
                console.log(err);
                return callback(err);
            }
            if (result.rowCount === 0) { callback('0 rows') }
            callback(null, result.rows);




        })
    }

    static async asyncExecuteQuery(query: string) {

        let result = await this._instance.cnn.query(query);
        return result.rows
    }



}