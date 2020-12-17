import {
    default as passport,
    PassportStatic,
} from 'passport';

import {
    default as passportLocal,
} from 'passport-local';

import {
    default as passportJwt,
} from 'passport-jwt';

import {
    default as jwt,
} from 'jsonwebtoken';

import {
    IUser,
    User,
} from '../../models';

import {
    IConfig,
} from '../config';

import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    Forbidden,
    Unauthorized
} from '../../utils';

export default class Auth {
    private config: IConfig;
    public passport: PassportStatic;

    private localAuth = passportLocal.Strategy;
    private jwtAuth = passportJwt.Strategy;
    private ExtractJwt = passportJwt.ExtractJwt;

    constructor(config: IConfig) {
        this.config = config;

        // Initializing
        this.initLocal();
        this.initJwt();

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        this.passport = passport;
    };

    // Initialize local login
    private initLocal() {
        passport.use(new this.localAuth({
            usernameField: 'email'
        }, async (email: string, password: string, done) => {
            try {
                // Checking if there is a user with this mail
                const user = await User.findOne({
                    email: email,
                });

                if (!user) {
                    return done(null, false, {
                        message: 'This is not a user!',
                    });
                };

                // Checking if passwords match
                return user.comparePassword(password, (err: any, match: boolean) => {
                    if (!match) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    };
                });
            } catch (e) {
                return done(e, false);
            };
        }));
    };

    // Initialize JSON Webtoken
    initJwt = () => {
        passport.use(
            new this.jwtAuth({
                    jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: this.config.auth.jwt.secret,
                },
                async (jwtPayload, done) => {
                    try {
                        const {
                            id
                        } = jwtPayload;
                        console.log(id);

                        const user = await User.findById(id);

                        if (!user) {
                            done(null, false);
                        }

                        done(null, user);
                    } catch (e) {
                        done(e, false);
                    }
                },
            ),
        );
    };

    // Create a JWT
    public createToken(user: IUser): string {
        // JWT with the user id
        const payload = {
            id: user._id,
        };

        return jwt.sign(payload, this.config.auth.jwt.secret, {
            expiresIn: 60 * 120,
        });
    };

    // Check if user has correct role
    public checkRole = (...roles: Array < string > ) => (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            next(new Forbidden());
        };

        // Check if user is authorized
        const role = roles.find((role) => (req.user as IUser).role === role);

        if (!role) {
            next(new Unauthorized());
        };

        return next();
    };
};