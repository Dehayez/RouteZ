"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
class App {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
        // Starting servers
        this.newExpress();
        this.newServer();
    }
    ;
    newExpress() {
        // Initialize express
        this.app = express_1.default();
        // Load middleware
        middleware_1.Middleware.load(this.app, this.config);
        // Initializing router
        this.newAuth();
        this.newRouter();
    }
    ;
    newServer() {
        // Create a server
        this.server = http_1.createServer(this.app);
        // When an error appears
        this.server.on('error', (error) => {
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
    }
    ;
    newAuth() {
        this.auth = new services_1.Auth(this.config);
    }
    ;
    newRouter() {
        this.router = new routes_1.Router(this.app, this.config, this.auth);
    }
    ;
    startServer() {
        // Start server on port 8000 of localhost
        this.server.listen(8000, 'localhost');
    }
    ;
    stopServer() {
        // Shutdown error, send error
        this.server.close((error) => {
            this.shutdown(error);
        });
    }
    ;
    shutdown(error) {
        // Shutdown server
        if (error) {
            console.log(error);
            process.exit(1);
        }
        ;
        process.exit();
    }
    ;
}
exports.default = App;
;
//# sourceMappingURL=App.js.map