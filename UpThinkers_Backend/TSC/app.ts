import server from './src/frameworks/server/server'
import config from './src/config/config'
import mongooseConfig from './src/frameworks/database/Mongoose'
import RouterConfig from './src/frameworks/server/router'
import expressConfig from './src/frameworks/server/express'
import { Server } from 'socket.io';

const app = server(config)
expressConfig(app);
RouterConfig(app);
mongooseConfig(config)

const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });





export default app;          


   