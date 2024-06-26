import server from './frameworks/server/server'
import config from './config/config'
import mongooseConfig from './frameworks/database/Mongoose'
import RouterConfig from './frameworks/server/router'
import expressConfig from './frameworks/server/express'

const app = server(config)
expressConfig(app);
RouterConfig(app);
mongooseConfig(config)


// const io = createSocketIoServer(server)
       
   
export default app;          