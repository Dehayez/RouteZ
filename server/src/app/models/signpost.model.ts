// Signpost model
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
    IModule 
} from './module.model';

interface ISignpost extends Document {
    title: string;
    text: string;
    icon: string;
    illustration: string;
    _moduleIds?: Array<IModule['_id']>;

    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
};

interface ISignpostModel extends PaginateModel<ISignpost>{};

const signPost: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        unique: true,
        required: true,
    },
    illustration: {
        type: String,
        unique: true,
        required: true,
    },
    _moduleIds: [
        {
            type: Schema.Types.ObjectId, ref: 'Module', required: false,
        },
    ],
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
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

signPost.plugin(mongoosePaginate);

signPost.virtual('modules', {
    ref: 'Module',
    localField: '_moduleIds',
    foreignField: '_id',
    justOne: false,
});

const SignPost = mongoose.model<ISignpost, ISignpostModel>(
    'Signpost',
    signPost,
);

export {
    ISignpost,
    SignPost,
    signPost,
};

