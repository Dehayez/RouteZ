// Material model
import {
  default as mongoose,
  Document,
  Schema,
  PaginateModel,
} from "mongoose";

import {
  default as mongoosePaginate,
} from "mongoose-paginate";

import { 
  IUser, 
  ITag,
  IModule,
} from "../models";

interface IMaterial extends Document {
  title: string;
  description: string;
  type: string;
  filename: string;
  file: string;
  videoUrl: string;
  size: string;
  _authorId: IUser['_id'];
  _tagIds: Array<ITag['_id']>;
  _moduleId: IModule['_id'];
  _likeIds: Array<IUser['_id']>;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
};

interface IMaterialModel extends PaginateModel<IMaterial>{};

const materialSchema:Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    enum: ['Presentatie', 'Document', 'Video']
  },
  filename: {
    type: String,
    required: false,
    unique: false,
  },
  file: {
    type: String,
    required: false,
    unique: false,
  },
  videoUrl: {
    type: String,
    unique: false,
    required: false,
  },
  size: {
    type: String,
    unique: false,
    required: false,
  },
  _authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _tagIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: false,
  }],
  _moduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  _likeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Likes',
    required: false,
  }],
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

materialSchema.plugin(mongoosePaginate);

materialSchema.virtual('tags', {
  ref: 'Tag',
  localField: '_tagIds',
  foreignField: '_id',
  justOne: false,
});

materialSchema.virtual('author', {
  ref: 'User',
  localField: '_authorId',
  foreignField: '_id',
  justOne: true,
});

materialSchema.virtual('module', {
  ref: 'Module',
  localField: '_moduleId',
  foreignField: '_id',
  justOne: true,
});

materialSchema.virtual('likes', {
  ref: 'Likes',
  localField: '_likeIds',
  foreignField: '_id',
  justOne: false,
});

const Material = mongoose.model<IMaterial, IMaterialModel>(
  'Material',
  materialSchema,
);

export {
  materialSchema,
  IMaterial,
  Material
};
