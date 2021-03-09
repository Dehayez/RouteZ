"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Winston
const winston_1 = require("winston");
// Import interfaces and enums
const logger_types_1 = require("./logger.types");
class Logger {
    constructor() {
        // Initialize Winston logger
        const { align, combine, colorize, timestamp, printf } = winston_1.format;
        this.logger = winston_1.createLogger({
            format: combine(colorize(), timestamp(), align(), printf((info) => {
                const { timestamp, level, message, ...args } = info;
                const ts = timestamp.slice(0, 19).replace('T', ' ');
                // Displayed information
                return `${ts} [${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}]`;
            })),
            transports: [
                // Transport to a file
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: './error.log', level: 'error' }),
                new winston_1.transports.File({ filename: './combined.log' }),
            ],
            exitOnError: false,
        });
    }
    ;
    // Main logging function
    log(level, msg, obj) {
        this.logger.log(level, msg, {
            object: obj,
            timestamp: new Date().toISOString(),
        });
    }
    ;
    // When error
    error(msg, obj) {
        this.log(logger_types_1.LogLevel.error, msg, obj);
    }
    ;
    // When info
    info(msg, obj) {
        this.log(logger_types_1.LogLevel.info, msg, obj);
    }
    ;
    // When warning
    warning(msg, obj) {
        this.log(logger_types_1.LogLevel.warning, msg, obj);
    }
    ;
}
;
exports.default = Logger;
//# sourceMappingURL=Logger.js.map