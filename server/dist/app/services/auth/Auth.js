"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const utils_1 = require("../../utils");
class Auth {
    constructor(config) {
        this.localAuth = passport_local_1.default.Strategy;
        this.jwtAuth = passport_jwt_1.default.Strategy;
        this.ExtractJwt = passport_jwt_1.default.ExtractJwt;
        // Initialize JSON Webtoken
        this.initJwt = () => {
            passport_1.default.use(new this.jwtAuth({
                jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.config.auth.jwt.secret,
            }, async (jwtPayload, done) => {
                try {
                    const { id } = jwtPayload;
                    console.log(id);
                    const user = await models_1.User.findById(id);
                    if (!user) {
                        done(null, false);
                    }
                    done(null, user);
                }
                catch (e) {
                    done(e, false);
                }
            }));
        };
        // Check if user has correct role
        this.checkRole = (...roles) => (req, res, next) => {
            if (!req.user) {
                next(new utils_1.Forbidden());
            }
            ;
            // Check if user is authorized
            const role = roles.find((role) => req.user.role === role);
            if (!role) {
                next(new utils_1.Unauthorized());
            }
            ;
            return next();
        };
        this.config = config;
        // Initializing
        this.initLocal();
        this.initJwt();
        passport_1.default.serializeUser((user, done) => {
            done(null, user);
        });
        passport_1.default.deserializeUser((user, done) => {
            done(null, user);
        });
        this.passport = passport_1.default;
    }
    ;
    // Initialize local login
    initLocal() {
        passport_1.default.use(new this.localAuth({
            usernameField: 'email'
        }, async (email, password, done) => {
            try {
                // Checking if there is a user with this mail
                const user = await models_1.User.findOne({
                    email: email,
                });
                if (!user) {
                    return done(null, false, {
                        message: 'This is not a user!',
                    });
                }
                ;
                // Checking if passwords match
                return user.comparePassword(password, (err, match) => {
                    if (!match) {
                        return done(null, false);
                    }
                    else {
                        return done(null, user);
                    }
                    ;
                });
            }
            catch (e) {
                return done(e, false);
            }
            ;
        }));
    }
    ;
    // Create a JWT
    createToken(user) {
        // JWT with the user id
        const payload = {
            id: user._id,
        };
        return jsonwebtoken_1.default.sign(payload, this.config.auth.jwt.secret, {
            expiresIn: 60 * 120,
        });
    }
    ;
}
exports.default = Auth;
;
//# sourceMappingURL=Auth.js.map