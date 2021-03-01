// User model
import {
    default as mongoose,
    Document,
    PaginateModel,
    Schema,
} from 'mongoose';

import {
    default as mongoosePaginate,
} from 'mongoose-paginate';

import {
    default as bcrypt,
} from 'bcrypt';

import { 
    IModule 
} from './module.model';

import { 
    IPath 
} from './path.model';

import { 
    ISignpost 
} from './signpost.model';

// Answer interface
interface IAnswer {
    answerId: string;
    text: string;
    correct: boolean;
    response: string;
}

// Exercise interface
interface IExercise {
    questionId: string;
    answers: Array<IAnswer>;
};

// Progress made in modules, paths and signposts
interface IProgress {
    _finishedModuleIds: Array<IModule['_id']>;
    _finishedPathIds: Array<IPath['_id']>;
    _finishedSignPostIds: Array<ISignpost['_id']>;
    _finishedExercises: Array<IExercise>;
    _lastSignpost: ISignpost['_id'];
    _lastModule: IModule['_id'];
};

// Main information of an user
interface IProfile {
    firstName: string;
    lastName: string;
    schoolName?: string;
    avatar?: string;
    professionalFunction?: string;
    phoneNumber?: string;
};

// Main interface
interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    profile: IProfile;
    progress?: IProgress,
    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
    comparePassword(candidatePass: String, cb: Function): void;
};

// Initialzing pagination
interface IUserModel extends PaginateModel<IUser> {};

// Creating a scheme for the database
const userSchema: Schema = new Schema({
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
                type: Schema.Types.ObjectId, ref: 'Module', required: false,
            },
        ],
        _finishedPathIds: [
            {
                type: Schema.Types.ObjectId, ref: 'Path', required: false,
            },
        ],
        _finishedSignPostsIds: [
            {
                type: Schema.Types.ObjectId, ref: 'Signpost', required: false,
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
            type: Schema.Types.ObjectId, ref: 'Module', required: false,
        },
        _lastSignpost: {
            type: Schema.Types.ObjectId, ref: 'Signpost', required: false,
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

userSchema.plugin(mongoosePaginate);

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
    const user: IUser = this as IUser;

    if (!user.isModified('password')) return next();

    try {
        return bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                throw err;
            };

            bcrypt.hash(user.password, salt, (errHash, hash) => {
                if (errHash) {
                    throw errHash;
                };

                user.password = hash;
                return next();
            });
        });
    } catch (e) {
        return next(e);
    };
});

// Comparing password with input
userSchema.methods.comparePassword = function(candidatePass: String, cb: Function) {
    const user = this;
    bcrypt.compare(candidatePass, user.password, (err, match) => {
        if (err) {
            return cb(err, null);
        };

        return cb(null, match);
    });
};

// Creating model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export {
    IUser,
    User,
    userSchema,
};
