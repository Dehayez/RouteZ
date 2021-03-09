"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dotenv support
const dotenv_1 = __importDefault(require("dotenv"));
// Import interfaces and enums
const config_types_1 = require("./config.types");
class Config {
    constructor() {
        // Initializing dotenv
        dotenv_1.default.config();
        // Load variables
        this.environmentVars();
    }
    ;
    environmentVars() {
        this.env = config_types_1.Environment[(process.env.NODE_ENV || config_types_1.Environment.development)];
        this.server = {
            host: process.env.NODE_HOST || 'localhost',
            port: Number(process.env.NODE_PORT || 8000),
            protocol: config_types_1.ServerProtocol[(process.env.NODE_PROTOCOL || config_types_1.ServerProtocol.http)],
        };
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
    }
    ;
}
;
exports.default = Config;
//# sourceMappingURL=Config.js.map