import dotenv from 'dotenv';

dotenv.config();

interface configInterface{
    PORT :number,
    MONGO:string
}

const config: configInterface = {
    PORT : parseInt(process.env.PORT|| '3000'),
    MONGO: process.env.MONGO||' '
}

export default config;