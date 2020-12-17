// Importing some packages
import { default as express, Application } from 'express';
import { default as bodyparser } from 'body-parser';
import { default as cors } from 'cors';
import { default as helmet } from 'helmet';

// Import config
import {
    IConfig,
} from '../services';

class Middleware {
    public static load (app: Application, config: IConfig) {
        app.use(bodyparser.urlencoded({ limit: '50mb', extended: false }));
        app.use(bodyparser.json({ limit: '50mb' }));

        app.use(helmet.hidePoweredBy());
        app.use(helmet.ieNoOpen());
        app.use(helmet.noSniff());
        app.use(helmet.xssFilter());

        const corsOptions = {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            exposedHeaders: ['x-auth-token'],
        };

        app.use(cors(corsOptions));
    };
};

export default Middleware;