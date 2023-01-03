import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

function transformValue(doc: mongoose.Document, ret: { [key: string]: any }) {
    delete ret._id;
}

export interface ICategorySchema extends mongoose.Document {
    name: string;
    description: string;
    status: string;
    tags: Array<string>;
    ownerId: Schema.Types.ObjectId;
}

export const CategorySchema = new mongoose.Schema<ICategorySchema>(
    {
        name: {
            type: String,
            required: [true, 'Name can not be empty']
        },
        description: {
            type: String
        },
        status: {
            required: [true, 'Status can not be empty'],
            type: String
        },
        tags: [
            {
                type: String
            }
        ],
        ownerId: {
            required: [true, 'Owner can not be empty'],
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: transformValue
        },
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: transformValue
        },
        timestamps: true
    }
);
