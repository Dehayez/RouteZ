import {
    default as mongoose,
    Connection,
} from "mongoose";

import { 
    IConfig 
} from "../config";

import { 
    ILogger 
} from "../logger";

export default class Db {
    private logger: ILogger;
    private config: IConfig;
    private db: Connection;

    constructor(logger: ILogger, config: IConfig) {
        this.logger = logger;
        this.config = config;
    };

    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongoose.connect(this.config.dbConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            })
            .then(() => {
                // Connection has been made
                this.db = mongoose.connection;
                this.logger.info('Connected to the database', {});
                resolve(true);
            })
            .catch((e) => {
                // Connection can't be made
                this.logger.error('Can\t connect to the database', {e});
                reject(e);
            });
        });
    };

    public disconnect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.close(true)
            .then(() => {
                // Disconnect with database
                this.logger.info('Disconnected with database', {});
                resolve(true);
            })
            .catch((e) => {
                // Can't disconnect database
                this.logger.info('Can\t disconnect with database', {e});
                reject(e);
            });
        });
    };
};