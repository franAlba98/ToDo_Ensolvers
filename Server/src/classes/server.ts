import express from 'express';
//import socketIO from 'socket.io';
import http from 'http';
/* import * as socket from '../socket/socket';
import {pausar} from '../controllers/ensayo.controllers'
import { arregloDM, EnsayoInterface } from '../interfaces/interfaces';
import { any } from 'bluebird';
import { fork } from 'child_process'; */

//Aca habria que importar el archivos de sockets personalizado

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    //public io: socketIO.Server;
    private httpServer: http.Server;
    private constructor() {
        this.app = express();
        //settings
        this.app.set('port', 4001);
        this.app.set('json spaces', 2);
        //configurando el socket
        this.httpServer = new http.Server(this.app);
        //this.io = socketIO(this.httpServer);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }


    start(callback: Function, ip?: string) {

        this.httpServer.listen(this.app.get('port'), ip, callback(1));

    }
}
