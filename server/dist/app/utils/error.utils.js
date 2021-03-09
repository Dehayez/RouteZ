"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.NotFound = exports.Internal = exports.Forbidden = exports.ServerError = void 0;
// Main class for error handling
class ServerError {
    constructor() {
        // Required
        this.status = 500;
        this.timestamp = Date.now();
        this.name = "** ERROR **";
        this.message = "Error occured in server";
    }
}
exports.ServerError = ServerError;
;
// Can't pass here
class Forbidden extends ServerError {
    constructor() {
        super(...arguments);
        this.name = "** FORBIDDEN **";
        this.message = "Seems that you can't pass trough this";
        this.status = 403;
    }
}
exports.Forbidden = Forbidden;
;
// Error with server
class Internal extends ServerError {
    constructor() {
        super(...arguments);
        this.name = "** INTERNAL SERVER ERROR **";
        this.message = "Seems like somethings wrong with our server";
        this.status = 500;
    }
}
exports.Internal = Internal;
;
// Can't be found
class NotFound extends ServerError {
    constructor() {
        super(...arguments);
        this.name = "** NOT FOUND **";
        this.message = "Seems like this can't be found";
        this.status = 500;
    }
}
exports.NotFound = NotFound;
;
// Not authorized client
class Unauthorized extends ServerError {
    constructor() {
        super(...arguments);
        this.name = "** UNAUTHORIZED **";
        this.message = "Seems like you aren't allowed here!";
        this.status = 500;
    }
}
exports.Unauthorized = Unauthorized;
;
//# sourceMappingURL=error.utils.js.map