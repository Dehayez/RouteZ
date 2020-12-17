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

// Progress made in modules
// Shown in percentages
interface IProgress {
    
};

// Main information of an user
interface IProfile {
    firstName: string;
    lastName: string;
    schoolName?: string;
    avatar?: string;
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
        schoolName: {
            type: String,
            required: false,
        },
        avatar: {
            type: String,
            required: false,
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
    },
});

userSchema.plugin(mongoosePaginate);

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