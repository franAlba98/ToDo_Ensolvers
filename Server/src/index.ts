import Server from './classes/server';
import {json} from 'express';
import clc from 'cli-color';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import itemRoutes from './routes/item';
import folderRoutes from './routes/folder';
import userRoutes from './routes/user';

const server = Server.instance;

/* middleware */
server.app.use(morgan('dev'));
server.app.use(json({limit: '50mb'}));
server.app.use(cors());

//body-parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

/* routes */
server.app.use('/api/item', itemRoutes);
server.app.use('/api/folder', folderRoutes);
server.app.use('/api/user', userRoutes);





server.start(()=>{
    console.log(clc.magenta.inverse.bold(`Server on port: ${server.app.get('port')}`));
});