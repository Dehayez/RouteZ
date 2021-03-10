"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRouter_1 = __importDefault(require("./ApiRouter"));
class Router {
    constructor(app, config, auth) {
        this.app = app;
        this.config = config;
        this.apiRouter = new ApiRouter_1.default(config, auth);
        this.registerRoutes();
    }
    ;
    registerRoutes() {
        this.app.use('/api', this.apiRouter.router);
    }
    ;
}
exports.default = Router;
;
//# sourceMappingURL=Router.js.map