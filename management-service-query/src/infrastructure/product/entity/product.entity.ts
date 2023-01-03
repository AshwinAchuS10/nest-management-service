import * as mongoose from "mongoose";
import { Schema } from "mongoose";

function transformValue(doc: mongoose.Document, ret: { [key: string]: any }) {
    delete ret._id;
}  

export interface IProductSchema extends mongoose.Document {
    version: number;
    internalName: string;
    friendlyName: string;
    description: string;
    tags: Array<string>;
    steps: Array<object>;
    status: string;
    ownerId: Schema.Types.ObjectId;
}

export const ProductSchema = new mongoose.Schema<IProductSchema>(
    {
        version: {
            type: Number,
            required: [true, 'Version can not be empty']
        },
        internalName: {
            type: String,
            required: [true, 'Internal name can not be empty']
        },
        friendlyName: {
            type: String,
            required: [true, 'Friendly name can not be empty']
        },
        description: {
            type: String
        },
        tags: [
            {
                type: String,
            }
        ],
        steps: [
            {
                type: Object,
                required: [true, 'Steps can not be empty']
            }
        ],
        status: {
            type: String,
            required: [true, 'Status can not be empty']
        },
        ownerId: {
            required: [true, 'Owner can not be empty'],
            type: Schema.Types.ObjectId, ref: 'User'
        }
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
        timestamps: true
    }
)