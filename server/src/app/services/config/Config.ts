// Dotenv support
import { default as dotenv } from 'dotenv';

// Import interfaces and enums
import {
    IConfig,
    IServerConfig,
    ServerProtocol, 
    Environment,
    IAuthConfig,
    IMailerConfig,
} from './config.types';

class Config implements IConfig {
    public env: Environment;
    public server: IServerConfig;
    public auth: IAuthConfig;
    public dbConnection: string;
    public mailer: IMailerConfig;

    constructor () {
        // Initializing dotenv
        dotenv.config();

        // Load variables
        this.environmentVars();
    };

    private environmentVars(): void {
        this.env = Environment[(process.env.NODE_ENV || Environment.development) as keyof typeof Environment];

        this.server = {
            host: process.env.NODE_HOST || 'localhost',
            port: Number(process.env.NODE_PORT || 8000),
            protocol: ServerProtocol[(process.env.NODE_PROTOCOL || ServerProtocol.http) as keyof typeof ServerProtocol],
        } as IServerConfig;

        this.dbConnection = process.env.MONGODB_CONNECTION;

        this.auth = {
            bcryptSalt: Number(process.env.AUTH_BCRYPT_SALT || 10),
            jwt: {
                secret: process.env.AUTH_JWT_SECRET || 'routez',
                session: Boolean(process.env.AUTH_JWT_SESSION || true),
            },
        };

        this.mailer = {
            mail: process.env.MAILER_MAIL,
            pass: process.env.MAILER_PASS,
            host: process.env.MAILER_HOST,
            port: Number(process.env.MAILER_PORT),
            secure: true,
        };
    };
};

export default Config;