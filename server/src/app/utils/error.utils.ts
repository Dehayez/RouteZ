// Import interface
import { IError } from './utils.types';

// Main class for error handling
class ServerError implements IError {
    // Optional
    public details?: string;
    public stack?: string;

    // Required
    public status: number = 500;
    public timestamp: number = Date.now();
    public name: string = "** ERROR **";
    public message: string = "Error occured in server";
};

// Can't pass here
class Forbidden extends ServerError {
    public name: string = "** FORBIDDEN **";
    public message: string = "Seems that you can't pass trough this";
    public status: number = 403;
};

// Error with server
class Internal extends ServerError {
    public name: string = "** INTERNAL SERVER ERROR **";
    public message: string = "Seems like somethings wrong with our server";
    public status: number = 500;
};

// Can't be found
class NotFound extends ServerError {
    public name: string = "** NOT FOUND **";
    public message: string = "Seems like this can't be found";
    public status: number = 500;
};

// Not authorized client
class Unauthorized extends ServerError {
    public name: string = "** UNAUTHORIZED **";
    public message: string = "Seems like you aren't allowed here!";
    public status: number = 500;
};

export {
    ServerError,
    Forbidden,
    Internal,
    NotFound,
    Unauthorized,
};