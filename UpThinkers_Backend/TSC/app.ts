import serverFunc from './src/frameworks/server/server';
import config from './src/config/config';
import mongooseConfig from './src/frameworks/database/Mongoose';
import RouterConfig from './src/frameworks/server/router';
import expressConfig from './src/frameworks/server/express';
import { connectSocket } from './src/application/functions/Socket/SocketCode';

const { app, server } = serverFunc(config)


expressConfig(app)
RouterConfig(app);
mongooseConfig(config);
connectSocket(server)


