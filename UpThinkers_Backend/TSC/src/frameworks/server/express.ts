import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

export default function expressConfig(app: Application) {
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use(morgan('dev'));
    app.use(mongoSanitize());
    app.use(helmet({ xssFilter: true }));
    app.use(cors({
        origin: 'http://localhost:3030',
        credentials: true
    }));
}

