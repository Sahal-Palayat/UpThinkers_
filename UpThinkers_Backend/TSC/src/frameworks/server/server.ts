import express, { Application } from "express";

const server: Function = (config: any) => {
    const app: Application = express();
    app.listen(config.PORT, () => {
        console.log(`server listening on ${config.PORT}`);
    });
    return app;
};

export default server;
