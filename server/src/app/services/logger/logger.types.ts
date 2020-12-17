// Enumerations 
export enum LogLevel {
    error = 'error',
    info = 'info',
    warning = 'warning',
};

// Interfaces
export interface ILogger {
    error(msg: string, obj: object): void;
    info(msg: string, obj: object): void;
    warning(msg: string, obj: object): void;
};