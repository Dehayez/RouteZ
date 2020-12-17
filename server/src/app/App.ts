import {
    createServer,
    Server,
} from 'http';

import {
    default as express,
    Application,
} from 'express';

import { 
    Auth,
    IConfig,
    ILogger 
} from './services';

import {
    Router,
} from './routes';

import { 
    Middleware 
} from './middleware';

export default class App {
    public app: Application;
    private server: Server;
    private logger: ILogger;
    private config: IConfig;
    private router: Router;
    private auth: Auth;

    constructor(logger: ILogger, config: IConfig) {
        this.logger = logger;
        this.config = config;

        // Starting servers
        this.newExpress();
        this.newServer();
    };

    private newExpress(): void {
        // Initialize express
        this.app = express();

        // Load middleware
        Middleware.load(this.app, this.config);

        // Initializing router
        this.newAuth();
        this.newRouter();
    };

    private newServer(): void {
        // Create a server
        this.server = createServer(this.app);

        // When an error appears
        this.server.on('error', (error?: Error) => {
            this.shutdown(error);
        });

        // When server is closing
        this.server.on('close', () => {
            this.logger.info('Server closed', {});
        });

        // When server is on
        this.server.on('listening', () => {
            this.logger.info('Server on localhost:8000', {});
        });
    };

    private newAuth(): void {
        this.auth = new Auth(this.config);
    };

    private newRouter(): void {
        this.router = new Router(this.app, this.config, this.auth);
    };

    public startServer(): void {
        // Start server on port 8000 of localhost
        this.server.listen(8000, 'localhost');
    };

    public stopServer(): void {
        // Shutdown error, send error
        this.server.close((error?: Error) => {
            this.shutdown(error);
        });
    };

    private shutdown(error?: Error): void {
        // Shutdown server
        if(error) {
            process.exit(1);
        };

        process.exit();
    };
};