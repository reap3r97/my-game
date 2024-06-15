import Server from './server/Server.js';
import db from './config/db.js';

db.connect();

const server = new Server();
server.start();