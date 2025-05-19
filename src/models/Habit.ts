import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
    userId: string
    name: string
    description: string
}

const habitSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
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
});

export const Habit = mongoose.model<IHabit>('Habit', habitSchema);
