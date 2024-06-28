import server from './src/frameworks/server/server'
import config from './src/config/config'
import mongooseConfig from './src/frameworks/database/Mongoose'
import RouterConfig from './src/frameworks/server/router'
import expressConfig from './src/frameworks/server/express'
import { Server } from 'socket.io';
import { connectSocket } from './src/application/functions/Socket/SocketCode'
import http from 'http';

const app = server(config)
expressConfig(app);
RouterConfig(app);
mongooseConfig(config)

export const serverr = http.createServer(app)


const io = new Server(serverr, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    } 
}) 

connectSocket(io)




export default app;          


   