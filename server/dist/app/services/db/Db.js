"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Db {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
    }
    ;
    connect() {
        return new Promise((resolve, reject) => {
            mongoose_1.default.connect(this.config.dbConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            })
                .then(() => {
                // Connection has been made
                this.db = mongoose_1.default.connection;
                this.logger.info('Connected to the database', {});
                resolve(true);
            })
                .catch((e) => {
                // Connection can't be made
                this.logger.error('Can\t connect to the database', { e });
                reject(e);
            });
        });
    }
    ;
    disconnect() {
        return new Promise((resolve, reject) => {
            this.db.close(true)
                .then(() => {
                // Disconnect with database
                this.logger.info('Disconnected with database', {});
                resolve(true);
            })
                .catch((e) => {
                // Can't disconnect database
                this.logger.info('Can\t disconnect with database', { e });
                reject(e);
            });
        });
    }
    ;
}
exports.default = Db;
;
//# sourceMappingURL=Db.js.map