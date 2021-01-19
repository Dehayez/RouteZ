// Tag model
import {
  default as mongoose,
  Document,
  Schema,
} from "mongoose";

interface ITag extends Document {
  name: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
};

const tagSchema : Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

const Tag = mongoose.model<ITag>(
  'Tag',
  tagSchema,
);

export {
  Tag,
  tagSchema,
  ITag,
};
