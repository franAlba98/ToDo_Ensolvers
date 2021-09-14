import Server from './classes/server';
import {json} from 'express';
import clc from 'cli-color';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import itemRoutes from './routes/item'

const server = Server.instance;

/* middleware */
server.app.use(morgan('dev'));
server.app.use(json());

//body-parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

/* routes */
server.app.use('/api/item', itemRoutes);


server.start(()=>{
    console.log(clc.magenta.inverse.bold(`Server on port: ${server.app.get('port')}`));
});