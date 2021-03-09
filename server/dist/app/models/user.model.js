"use strict";
// User model
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const bcrypt_1 = __importDefault(require("bcrypt"));
;
;
;
;
;
// Creating a scheme for the database
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        professionalFunction: {
            type: String,
            required: false,
        },
        schoolName: {
            type: String,
            required: false,
        },
        avatar: {
            type: String,
            required: false,
        },
    },
    progress: {
        _finishedModuleIds: [
            {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'Module', required: false,
            },
        ],
        _finishedPathIds: [
            {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'Path', required: false,
            },
        ],
        _finishedSignPostsIds: [
            {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'Signpost', required: false,
            },
        ],
        _finishedExercises: [{
                questionId: {
                    type: String,
                    required: true,
                },
                answers: [{
                        answerId: {
                            type: String,
                        },
                        text: {
                            type: String,
                        },
                        correct: {
                            type: Boolean,
                        },
                        response: {
                            type: String,
                        }
                    }],
            }],
        _lastModule: {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Module', required: false,
        },
        _lastSignpost: {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Signpost', required: false,
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
    _createdAt: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    _modifiedAt: {
        type: Number,
        required: false,
        default: null,
    },
    _deletedAt: {
        type: Number,
        required: false,
        default: null,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.userSchema = userSchema;
userSchema.plugin(mongoose_paginate_1.default);
userSchema.virtual('modules', {
    ref: 'Module',
    localField: '_finishedModuleIds',
    foreignField: '_id',
    justOne: false,
});
userSchema.virtual('paths', {
    ref: 'Path',
    localField: '_finishedPathIds',
    foreignField: '_id',
    justOne: false,
});
userSchema.virtual('signpost', {
    ref: 'Signpost',
    localField: '_finishedSignPostIds',
    foreignField: '_id',
    justOne: false,
});
// Hashing the password
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    try {
        return bcrypt_1.default.genSalt(10, (err, salt) => {
            if (err) {
                throw err;
            }
            ;
            bcrypt_1.default.hash(user.password, salt, (errHash, hash) => {
                if (errHash) {
                    throw errHash;
                }
                ;
                user.password = hash;
                return next();
            });
        });
    }
    catch (e) {
        return next(e);
    }
    ;
});
// Comparing password with input
userSchema.methods.comparePassword = function (candidatePass, cb) {
    const user = this;
    bcrypt_1.default.compare(candidatePass, user.password, (err, match) => {
        if (err) {
            return cb(err, null);
        }
        ;
        return cb(null, match);
    });
};
// Creating model
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
//# sourceMappingURL=user.model.js.map