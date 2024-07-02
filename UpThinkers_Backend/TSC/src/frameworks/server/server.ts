import express, { Application } from "express";
import http from "http"

const server: Function = (config: any) => {

    const app: Application = express();
    const server = http.createServer(app);

    server.listen(4000, () => console.log('listening on *:4000'));
    return { app, server };

};

export default server;
