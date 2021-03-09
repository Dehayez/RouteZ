"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const services_1 = require("./app/services");
(async () => {
    // Creating logger service
    const logger = new services_1.Logger();
    // Creating config service
    const config = new services_1.Config();
    try {
        // Create database
        const mongo = new services_1.Db(logger, config);
        await mongo.connect();
        // Start gridfs
        services_1.Files.initStream();
        // Initializing
        const app = new app_1.default(logger, config);
        app.startServer();
        // Stop server
        const stop = async () => {
            app.stopServer();
            // Disconnect mongo
            await mongo.disconnect();
        };
        process.on('SIGINT', () => stop());
        process.on('SIGTERM', () => stop());
    }
    catch (e) {
        console.log(e);
    }
    ;
})();
//# sourceMappingURL=index.js.map