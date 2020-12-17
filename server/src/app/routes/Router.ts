import { 
    Application
} from 'express';

import { 
    Auth,
    IConfig 
} from '../services';

import {
    default as ApiRouter
} from './ApiRouter';

export default class Router {
    private app: Application
    private apiRouter: ApiRouter;
    private config: IConfig;

    constructor(app: Application, config: IConfig, auth: Auth) {
        this.app = app;
        this.config = config;

        this.apiRouter = new ApiRouter(config, auth);

        this.registerRoutes();
    };

    private registerRoutes(): void {
        this.app.use('/api', this.apiRouter.router);
    };
};