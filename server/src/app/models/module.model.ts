// Module model
import {
    default as mongoose,
    Document,
    Schema,
    PaginateModel,
} from 'mongoose';

import {
    default as mongoosePaginate,
} from 'mongoose-paginate';

import { 
    IPath 
} from './path.model';

interface IModule extends Document {
    title: string;
    shortInfo: string;
    mainInfo: string;
    _pathIds: Array<IPath['_id']>;

    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
};

interface IModuleModel extends PaginateModel<IModule>{};

const moduleItem: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    mainInfo: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    _pathIds: [
        {
            type: Schema.Types.ObjectId, ref: 'Path', required: false,
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

moduleItem.plugin(mongoosePaginate);

moduleItem.virtual('paths', {
    ref: 'Path',
    localField: '_pathIds',
    foreignField: '_id',
    justOne: false,
});

const ModuleItem = mongoose.model<IModule, IModuleModel>(
    'Module',
    moduleItem,
);

export {
    ModuleItem,
    IModule,
    moduleItem,
};
