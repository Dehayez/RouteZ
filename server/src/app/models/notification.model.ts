import {
  default as mongoose,
  Document,
  Schema,
} from 'mongoose';

// Models
import { ISignpost } from './signpost.model';
import { IModule } from './module.model';
import { IMaterial } from './material.model';
import { IUser } from './user.model';

interface INotification extends Document {
  text: string;
  type: string;
  _createdAt: number;
  seen: boolean;
  _userId: IUser['_id'];
  _signpostId: ISignpost['_id'];
  _moduleId: IModule['_id'];
  _materialId: IMaterial['_id'];
};

const notificationSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['signpost', 'module', 'material', 'reward'],
  },
  _createdAt: {
    type: Number,
    default: Date.now(),
  },
  seen: {
    type: Boolean,
    default: false,
  },
  _signpostId: {
    type: Schema.Types.ObjectId,
    ref: 'Signpost',
    required: false,  
  },
  _moduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: false,  
  },
  _materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: false,  
  },
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,  
  },
}, {
  toJSON: {
    virtuals: true,
  }, 
  toObject: {
    virtuals: true,
  },
});

const Notification = mongoose.model<INotification>(
  'Notification',
  notificationSchema,
);

export {
  notificationSchema,
  INotification,
  Notification,
};
