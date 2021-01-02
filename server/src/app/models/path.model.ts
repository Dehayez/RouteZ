// Path module
import {
  default as mongoose,
  Document,
  Schema,
} from 'mongoose';

import { 
  IExercise 
} from './exercise.model';

interface IPath extends Document {
  title: string;
  type: string;
  theoryText: string;
  videoUrl: string;
  _exerciseIds: Array<IExercise['_id']>;

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
};

const pathSchema : Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    enum: ['Theorie', 'Video', 'Tips and Tricks', 'Oefeningen'],
  },
  theoryText: {
    type: String,
    required: false,
    unique: false,
  },
  videoUrl: {
    type: String,
    required: false,
    unique: false,
  },
  _exerciseIds: [
    {
      type: Schema.Types.ObjectId, ref: 'Exercise', required: false,
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

pathSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_exerciseIds',
  foreignField: '_id',
  justOne: false,
});

const Path = mongoose.model<IPath>('Path', pathSchema);

export {
  IPath,
  Path,
  pathSchema,
};
