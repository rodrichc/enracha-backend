import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    createdAt: Date;
}

const habitSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export const Habit = mongoose.model<IHabit>('Habit', habitSchema);
