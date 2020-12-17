// Import Winston
import {
    default as winston,
    format,
    createLogger,
    transports,
} from 'winston';

// Import interfaces and enums
import {
    ILogger,
    LogLevel,
} from './logger.types';

class Logger implements ILogger {
    private logger: winston.Logger;

    constructor () {
        // Initialize Winston logger
        const { align, combine, colorize, timestamp, printf } = format;

        this.logger = createLogger({
            format: combine(
                colorize(),
                timestamp(),
                align(),
                printf((info) => {
                    const { timestamp, level, message, ...args } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');

                    // Displayed information
                    return `${ts} [${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}]`;
                }),
            ),
            transports: [
                // Transport to a file
                new transports.Console(),
                new transports.File({ filename: './error.log', level: 'error' }),
                new transports.File({ filename: './combined.log' }),
            ],
            exitOnError: false,
        });
    };

    // Main logging function
    private log(level: string, msg: string, obj: object) {
        this.logger.log(level, msg, {
            object: obj,
            timestamp: new Date().toISOString(),
        });
    };

    // When error
    public error(msg: string, obj: object) {
        this.log(LogLevel.error, msg, obj);
    };

    // When info
    public info(msg: string, obj: object) {
        this.log(LogLevel.info, msg, obj);
    };    
    
    // When warning
    public warning(msg: string, obj: object) {
        this.log(LogLevel.warning, msg, obj);
    };
};

export default Logger;