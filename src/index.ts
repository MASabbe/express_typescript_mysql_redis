import {createServer} from 'http';
import app from './config/express';
import logger from './config/logger';
import {appVersion, appName, env, port} from './config/vars';


const server = createServer(app);
server.listen(port);
logger.info(`${appName.toUpperCase()} v${appVersion} server started on port ${port} (${env})`);

export default server;