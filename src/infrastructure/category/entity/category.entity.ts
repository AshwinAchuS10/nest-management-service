import * as mongoose from 'mongoose';

function transformValue(doc: mongoose.Document, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

export interface ICategorySchema extends mongoose.Document {
  name: string;
}

export const CategorySchema = new mongoose.Schema<ICategorySchema>(
  {
    name: {
      type: String,
      required: [true, 'FirstName can not be empty']
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
