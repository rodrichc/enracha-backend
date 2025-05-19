import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string
    name: string
    email: string
    password: string
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

export const User = mongoose.model<IUser>('User', userSchema);
