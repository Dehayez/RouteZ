"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
class Middleware {
    static load(app, config) {
        app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
        app.use(body_parser_1.default.json({ limit: '50mb' }));
        app.use(helmet_1.default.hidePoweredBy());
        app.use(helmet_1.default.ieNoOpen());
        app.use(helmet_1.default.noSniff());
        app.use(helmet_1.default.xssFilter());
        const corsOptions = {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            exposedHeaders: ['x-auth-token'],
        };
        app.use(cors_1.default(corsOptions));
    }
    ;
}
;
exports.default = Middleware;
//# sourceMappingURL=Middleware.js.map