// Enunemerations
export enum Environment {
    development = 'development',
    local = 'local',
    production = 'production',
    staging = 'staging',
    test = 'test',
};

export enum ServerProtocol {
    http = 'http',
    https = 'https',
};

// Interfaces
export interface IServerConfig {
    host: string;
    port: number;
    protocol: string;
};

export interface IJwtConfig {
    secret: string;
    session: boolean;
};

export interface IAuthConfig {
    bcryptSalt: number;
    jwt: IJwtConfig;
};

export interface IMailerConfig {
    mail: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
};

export interface IConfig {
    auth: any;
    env: Environment,
    server: IServerConfig,
    dbConnection: string;
    mailer: IMailerConfig;
};