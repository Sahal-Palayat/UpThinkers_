import server from './src/frameworks/server/server'
import config from './src/config/config'
import mongooseConfig from './src/frameworks/database/Mongoose'
import RouterConfig from './src/frameworks/server/router'
import expressConfig from './src/frameworks/server/express'

const app = server(config)
expressConfig(app);
RouterConfig(app);
mongooseConfig(config)


// const io = createSocketIoServer(server)     
        
   
export default app;          