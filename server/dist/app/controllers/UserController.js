"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const bcrypt_1 = __importDefault(require("bcrypt"));
;
class UserController {
    constructor(auth, config) {
        // Getting all users
        this.allUsers = async (req, res, next) => {
            try {
                // Only possible when you are a admin
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                // If user doesn't exist
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                // if user isn't an admin
                if (user.role !== 'admin') {
                    return res.status(401).json({
                        error: "Je kan deze optie niet gebruiken."
                    });
                }
                ;
                // Pagination inserted
                const { limit, skip } = req.query;
                let users;
                if (limit && skip) {
                    // Get user paginated
                    // users = await User.paginate({}, {
                    //     limit: 10,
                    //     page: 1,
                    //     sort: {
                    //         _createdAt: -1,
                    //     },
                    // });
                }
                else {
                    // Get all users
                    users = await models_1.User.find().sort({ _createdAt: -1 }).exec();
                }
                ;
                return res.status(200).json(users);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Getting current user
        this.getMyself = async (req, res, next) => {
            try {
                // Only you as a user will be given
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id }).populate({
                    path: 'progress',
                    populate: {
                        path: '_lastModule',
                    }
                }).populate({
                    path: 'progress',
                    populate: {
                        path: '_lastSignpost',
                    }
                });
                // When user doesn't exist
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Get one user
        this.getUser = async (req, res, next) => {
            try {
                const { id } = req.params;
                const user = await models_1.User.findOne({ _id: id });
                // When user doesn't exist
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Update a user
        this.updateMyself = async (req, res, next) => {
            try {
                // Main values to be edited
                const { email, firstName, lastName, schoolName, avatar, professionalFunction, phoneNumber } = req.body;
                // First off all, check if you're the user
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                // Updating the user
                const updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                    $set: {
                        email: email,
                        'profile.firstName': firstName,
                        'profile.lastName': lastName,
                        'profile.schoolName': schoolName,
                        'profile.avatar': avatar,
                        'profile.professionalFunction': professionalFunction,
                        'profile.phoneNumber': phoneNumber,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedUser);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.editUser = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { role, firstName, lastName } = req.body;
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                // Updating the user
                const updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                    $set: {
                        'profile.firstName': firstName,
                        'profile.lastName': lastName,
                        'role': role,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedUser);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.updateLastProgress = async (req, res, next) => {
            try {
                const { moduleId, signpostId } = req.body;
                // First off all, check if you're the user
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                const updatedUser = await models_1.User.findByIdAndUpdate(user._id, {
                    $set: {
                        'progress._lastSignpost': signpostId,
                        'progress._lastModule': moduleId,
                    },
                });
                return res.status(200).json(updatedUser);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.updateProgress = async (req, res, next) => {
            try {
                // Main values to be edited
                const { moduleId, pathId, signpostId, exercise } = req.body;
                // First off all, check if you're the user
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet."
                    });
                }
                ;
                let updatedUser;
                if (moduleId) {
                    let array = [];
                    if (user.progress._finishedModuleIds.includes(moduleId))
                        return res.status(200).json({
                            message: "Deze module is al reeds toegevoegd",
                        });
                    if (!user.progress._finishedModuleIds || user.progress._finishedModuleIds.length === 0) {
                        array.push(moduleId);
                        // Updating the user
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedModuleIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    else {
                        // Updating the user
                        array = user.progress._finishedModuleIds;
                        array.push(moduleId);
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedModuleIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    ;
                    const signposts = await models_1.SignPost.find().exec();
                    for (let i = 0; i < signposts.length; i++) {
                        let completedSignpost;
                        let addSignpost = true;
                        for (let j = 0; j < array.length; j++) {
                            if (!signposts[i]._moduleIds.includes(array[i])) {
                                addSignpost = false;
                                completedSignpost = signposts[i];
                            }
                            ;
                        }
                        ;
                        if (addSignpost) {
                            await models_1.User.findOneAndUpdate({ _id: id }, {
                                $push: {
                                    'progress._finishedSignpostIds': completedSignpost._id,
                                }
                            });
                            const createdNotification = new models_1.Notification({
                                text: 'Je hebt een nieuwe beloning ontvangen wegens het vervolledigen van een wegwijzer!',
                                type: 'reward',
                                _userId: id,
                                _signpostId: completedSignpost._id,
                            });
                            await createdNotification.save();
                        }
                        ;
                    }
                    ;
                }
                ;
                if (pathId) {
                    let array = [];
                    if (user.progress._finishedPathIds.includes(pathId))
                        return res.status(200).json({
                            message: "Dit pad is al reeds toegevoegd",
                        });
                    if (!user.progress._finishedPathIds || user.progress._finishedPathIds.length === 0) {
                        array.push(pathId);
                        // Updating the user
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedPathIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    else {
                        array = user.progress._finishedPathIds;
                        array.push(pathId);
                        // Updating the user
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedPathIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    ;
                }
                ;
                if (exercise) {
                    for (let i = 0; i < user.progress._finishedExercises.length; i++) {
                        for (let j = 0; j < exercise.length; j++) {
                            if (exercise[j].questionId === user.progress._finishedExercises[i].questionId) {
                                return res.status(200).json({
                                    message: "Deze oefening is al reeds toegevoegd",
                                });
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    updatedUser = await models_1.User.findByIdAndUpdate(id, {
                        $push: {
                            'progress._finishedExercises': exercise,
                        }
                    }, { new: true }).exec();
                }
                ;
                if (signpostId) {
                    let array = [];
                    if (user.progress._finishedSignPostIds.includes(signpostId))
                        return res.status(200).json({
                            message: "Deze wegwijzer is al reeds toegevoegd",
                        });
                    if (!user.progress._finishedSignPostIds || user.progress._finishedSignPostIds.length === 0) {
                        array.push(signpostId);
                        // Updating the user
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedSignPostIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    else {
                        array = user.progress._finishedSignPostIds;
                        array.push(signpostId);
                        // Updating the user
                        updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, {
                            $set: {
                                'progress._finishedSignPostIds': array,
                                _modifiedAt: Date.now(),
                            },
                        }, { new: true }).exec();
                    }
                    ;
                }
                ;
                return res.status(200).json(updatedUser);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Delete a user
        this.deleteMyself = async (req, res, next) => {
            try {
                // Get your bearer token
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOneAndRemove({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker kan niet verwijderd worden.",
                    });
                }
                ;
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Delete a user
        this.deleteUser = async (req, res, next) => {
            try {
                const { id } = req.params;
                const user = await models_1.User.findOneAndRemove({ _id: id });
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker kan niet verwijderd worden.",
                    });
                }
                ;
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Registering a user
        this.newUser = async (req, res, next) => {
            const { email } = req.body;
            // Check if user exists
            let existing = await models_1.User.findOne({ email: email });
            if (existing) {
                return res.status(403).json({ error: 'Er is al een gebruiker gemaakt met dit e-mailadres' });
            }
            ;
            // Fill in user data
            const newUser = new models_1.User(req.body);
            const user = await newUser.save();
            // Create a jwt token
            const jwtToken = this.auth.createToken(user);
            return res.status(200).json({
                token: jwtToken,
            });
        };
        // Create user from backoffice
        this.createUser = async (req, res, next) => {
            try {
                const { email, password, role, firstName, lastName } = req.body;
                // Checking if user exists
                const checkIfExist = await models_1.User.findOne({ email: email });
                if (checkIfExist)
                    return res.status(403).json({
                        error: "Er bestaat al reeds een gebruiker",
                    });
                // New user
                let user;
                bcrypt_1.default.genSalt(10, (err, salt) => {
                    if (err) {
                        throw err;
                    }
                    ;
                    bcrypt_1.default.hash(password, salt, async (errHash, hash) => {
                        if (errHash) {
                            throw errHash;
                        }
                        ;
                        const newUser = new models_1.User({
                            email: email,
                            password: hash,
                            'profile.firstName': firstName,
                            'profile.lastName': lastName,
                            role: role,
                        });
                        user = await newUser.save();
                    });
                });
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.calculateUserProgress = async (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                // Find user
                const user = await models_1.User.findById(id);
                if (!user) {
                    return res.status(404).json({
                        error: "Deze gebruiker kan niet gevonden worden.",
                    });
                }
                ;
                // Calculate every signposts progress
                const signposts = await models_1.SignPost.find().populate("modules").exec();
                let array = [];
                for (let i = 0; i < signposts.length; i++) {
                    let done = 0;
                    let total = signposts[i]._moduleIds.length;
                    for (let j = 0; j < signposts[i]._moduleIds.length; j++) {
                        if (user.progress._finishedModuleIds.includes(signposts[i].modules[j]._id)) {
                            done += 1;
                        }
                        ;
                    }
                    ;
                    let percentage = (done / total) * 100;
                    array.push({ signpost: signposts[i], progress: { percentage: percentage, finishedModules: done, totalModules: total } });
                }
                ;
                return res.status(200).json(array);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // User logging in
        this.loggingInUser = async (req, res, next) => {
            this.auth.passport.authenticate('local', {
                session: this.config.auth.jwt.session,
            }, (e, user) => {
                if (e) {
                    return next(e);
                }
                ;
                // When user can't be found
                if (!user) {
                    return res.status(404).json({
                        error: 'Er is iets verkeerd gelopen bij het aanmelden.'
                    });
                }
                ;
                // Create a token
                const token = this.auth.createToken(user);
                return res.status(200).json({ token: token, id: user._id });
            })(req, res, next);
        };
        // Admin logging in
        this.loggingInAdmin = async (req, res, next) => {
            this.auth.passport.authenticate('local', {
                session: this.config.auth.jwt.session,
            }, (e, user) => {
                if (e) {
                    return next(e);
                }
                ;
                if (user.role !== 'admin') {
                    return res.status(404).json({
                        error: 'Er is iets verkeerd gelopen bij het aanmelden.'
                    });
                }
                ;
                // When user can't be found
                if (!user) {
                    return res.status(404).json({
                        error: 'Er is iets verkeerd gelopen bij het aanmelden.'
                    });
                }
                ;
                // Create a token
                const token = this.auth.createToken(user);
                return res.status(200).json({ token: token, id: user._id });
            })(req, res, next);
        };
        // Check if token
        this.checkToken = async (req, res, next) => {
            // Get your bearer token
            if (!req.headers.authorization) {
                return res.status(401).json({
                    error: "Deze gebruiker bestaat niet.",
                });
            }
            ;
            const token = req.headers.authorization.slice(7);
            const payload = Object(jwt_decode_1.default(token));
            const { id } = payload;
            req.body.id = id;
            next();
        };
        this.auth = auth;
        this.config = config;
    }
    ;
}
exports.default = UserController;
;
//# sourceMappingURL=UserController.js.map