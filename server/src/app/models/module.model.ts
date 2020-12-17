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

interface IModule extends Document {
    title: string;
    shortInfo: string;
    mainInfo: string;
    cardImg: string;

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
    shortInfo: {
        type: String,
        required: true,
    },
    mainInfo: {
        type: String,
        required: true,
    },
    cardImg: {
        type: String,
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

moduleItem.plugin(mongoosePaginate);

const ModuleItem = mongoose.model<IModule, IModuleModel>(
    'Module',
    moduleItem,
);

export {
    ModuleItem,
    IModule,
    moduleItem,
};