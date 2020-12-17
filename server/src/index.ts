import { default as App } from './app';
import { ILogger, Logger, IConfig, Config, Db, Files } from './app/services';

(async() => {
    // Creating logger service
    const logger: ILogger = new Logger();

    // Creating config service
    const config: IConfig = new Config();

    try {
        // Create database
        const mongo = new Db(logger, config);
        await mongo.connect();

        // Start gridfs
        Files.initStream();

        // Initializing
        const app: App = new App(logger, config);
        app.startServer();
    
        // Stop server
        const stop = async () => {
            app.stopServer();
            // Disconnect mongo
            await mongo.disconnect();

            logger.info('stopped processes', {});
        };
    
        process.on('SIGINT', () =>  stop());
        process.on('SIGTERM', () => stop());
    } catch (e) {
        logger.error('Error', {e});
    };
})();